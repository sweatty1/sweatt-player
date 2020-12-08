import * as mm from 'music-metadata';
const fs = window.require('fs');
// had to change music-metadata/lib/common/randomfilereader.js
// and also strtok3/lib/fspromise to have window.requrie('fs')
// to get music-metadata to work

var Artists = new Set();
var Albums = [];

export function MusicFolderReader(baseFolder) {
    Artists = new Set();
    Albums = [];
    return recursiveFolder(baseFolder).then(songs => {
        // build the objects
        return OrganizanizeMusic(songs);
    })
};

function recursiveFolder(folder) {
    return readFolder(folder).then(files => {
        let subDirectories = files.filter((file) =>  file.isDirectory());
        let songs = files.filter((file) => file.isFile() && file.name.split('.').pop() === "mp3");
        let albumArtDirent = files.filter((file) => file.isFile() && file.name.split('.').pop() === "jpg");
        let songsInformationPromises = songs.map((song) => {
            let songFileLocation = folder + '\\' + song.name;
            return mm.parseFile(songFileLocation).then(parseResult => {
                Artists.add(parseResult.common.artist);
                let albumArts = findAlbumArt(folder, parseResult, albumArtDirent);
                let albumInfo = { albumName: parseResult.common.album, albumArts: albumArts };
                if (!Albums.some((album) => album.albumName === albumInfo.albumName)) {
                    Albums.push(albumInfo); 
                }
                return {songInfo: parseResult, fileLocation: songFileLocation, albumArts: albumArts};
            })
        })

        return Promise.all(songsInformationPromises).then((songs) => {
            // if we have subDirectories keep collecting
            if (subDirectories.length === 0) {
                return songs;
            }
            let subDirectoriesSongsPromises = subDirectories.map(directory => {
               return recursiveFolder(folder + '\\' + directory.name).then(songFiles =>{
                   return songFiles
               }) 
           })
           return Promise.all(subDirectoriesSongsPromises).then((result) => {
               return songs.concat(result).flat();
           })
        })
    })
}

function readFolder(folder) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folder, { withFileTypes: true }, (err, files) => {
            if(err){
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

function OrganizanizeMusic(songs) {
    const sortedArtists = Array.from(Artists).sort();
    const sortedAlbums = Array.from(Albums).sort((a,b) => {
        let albumA = a.albumName.toUpperCase();
        let albumB = b.albumName.toUpperCase();
        return (albumA < albumB) ? -1 : (albumA > albumB) ? 1 : 0;
    });
    const sortedSongs = songs.sort((a,b) => {
        let titleA = a.songInfo.common.title.toUpperCase();
        let titleB = b.songInfo.common.title.toUpperCase();
        return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    })
    return {
        songs: sortedSongs,
        albums: sortedAlbums,
        artists: sortedArtists
    }
}

function findAlbumArt(folder, parseResult, albumjpgDirents) {
    let musicMetaDataAlbumArt = parseResult.common.picture;
    let thumbNailArt = musicMetaDataAlbumArt;
    if(!Array.isArray(albumjpgDirents) || !albumjpgDirents.length){
        return { thumbNail: thumbNailArt, folder: null};;
    }
    // let albumArts = albumjpgDirents.map((direntAlbum) => folder + '\\' + direntAlbum.name );
    // 0 is small 1 is large 2 is small and 3 is large
    let thumbNailDirentArt = albumjpgDirents.find((direntAlbum) => direntAlbum.name.toUpperCase().includes("SMALL") || direntAlbum.name.toUpperCase().includes("THUMBNAIL"));
    let folderDirentArt = albumjpgDirents.find((direntAlbum) => direntAlbum.name.toUpperCase().includes("LARGE") || direntAlbum.name.toUpperCase().includes("FOLDER"));
    if (!thumbNailArt) thumbNailArt = folder + '\\' + thumbNailDirentArt.name;
    let folderArt = folder + '\\' + folderDirentArt.name;
    return { thumbNail: thumbNailArt, folder: folderArt};
}