const wallpaper = require('wallpaper');
const xattr = require('fs-xattr');
const fs = require('fs');
const _ = require('lodash');

const used_flag = 'wprotate.used';

const wallpaper_path = '/Users/cedric/img/wallpapers';

const allWallpapers = fs.readdirSync(wallpaper_path)
    .map(x => `${wallpaper_path}/${x}`)
    .filter(x => fs.statSync(x).isFile());

let unusedWallpapers = allWallpapers
    .filter(x => xattr.listSync(x).indexOf(used_flag) < 0);

if (unusedWallpapers.length === 0) {
    allWallpapers.forEach(x => xattr.removeSync(x, used_flag));
    unusedWallpapers = allWallpapers;
}

const newWallpaper = _.sample(unusedWallpapers);
wallpaper.set(newWallpaper).then(() => {
    xattr.setSync(newWallpaper, used_flag, '1');
});