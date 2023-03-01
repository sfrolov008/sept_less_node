const fs = require('node:fs')
const path = require('path')


// ----------------------------Task from preview------------------------------------

// fs.mkdir(path.join('boys'), err => {
//     if (err) throw new Error()
// })

// fs.mkdir(path.join('girls'), err => {
//     if (err) throw new Error()
// })

// fs.appendFile(path.join('boys','boy1.json'), JSON.stringify({name:'vanya', gender:'male'}),err => {
//     if (err) throw new Error()
//     console.log(err);
// })
//
// fs.appendFile(path.join('girls','girl1.json'), JSON.stringify({name:'anya', gender:'female'}),err => {
//     if (err) throw new Error()
//     console.log(err);
//
fs.readdir(path.join('boys'), (err, files) => {
    for (const fileName of files) {
        fs.stat(path.join('boys', `${fileName}`), (err1, stats) => {
            if (stats.isFile()) {
                fs.readFile(path.join('boys', `${fileName}`), (err2, data) => {
                    const obj = JSON.parse(data)
                    if (obj.gender === 'female') {
                        fs.copyFile(path.join('boys', `${fileName}`), path.join('girls', `${fileName}`), err3 => {
                            fs.unlink(path.join('boys', `${fileName}`), err4 => {
                                if (err4){
                                    throw err4
                                }
                            })
                        })
                    }
                })
            }
        })
    }
})

fs.readdir(path.join('girls'), (err, files) => {
    for (const fileName of files) {
        fs.stat(path.join('girls', `${fileName}`), (err1, stats) => {
            if (stats.isFile()) {
                fs.readFile(path.join('girls', `${fileName}`), (err2, data) => {
                    const obj = JSON.parse(data)
                    if (obj.gender === 'male') {
                        fs.copyFile(path.join('girls', `${fileName}`), path.join('boys', `${fileName}`), err3 => {
                            fs.unlink(path.join('girls', `${fileName}`), err4 => {
                                if (err4){
                                    throw err4
                                }
                            })
                        })
                    }
                })
            }
        })
    }
})

// ----------------------------Task from lesson1------------------------------------

fs.readdir(path.join('dir'), {withFileTypes: true}, (err, files) => {
    if (err) throw new Error()
    for (const file of files) {
        if (file.isFile()) {
            console.log('FILE:', file);
        }else if (file.isDirectory()){
            console.log('FOLDER:',file)
        }
    }
})