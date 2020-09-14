import * as mm from 'music-metadata';
const fs = window.require('fs');
// had to change music-metadata/lib/common/randomfilereader.js
// and also strtok3/lib/fspromise to have window.requrie('fs')
// to get music-metadata to work

var Artists = new Set();
var Albums = new Set();

export function MusicFolderReader(baseFolder) {
    Artists = new Set();
    Albums = new Set();
    return recursiveFolder(baseFolder).then(songs => {
        // build the objects
        return OrganizanizeMusic(songs);
    })
};

function recursiveFolder(folder) {
    return readFolder(folder).then(files => {
        let subDirectories = files.filter((file) =>  file.isDirectory());
        let songs = files.filter((file) => file.isFile() && file.name.split('.').pop() === "mp3");
        let songsInformationPromises = songs.map((song) => {
            let songFileLocation = folder + '\\' + song.name;
            return mm.parseFile(songFileLocation).then(parseResult => {
                Artists.add(parseResult.common.artist);
                Albums.add(parseResult.common.album);
                return {songInfo: parseResult, fileLocation: songFileLocation};
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
    const sortedAlbums = Array.from(Albums).sort();
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