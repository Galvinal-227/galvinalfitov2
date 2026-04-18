/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const fs = require('fs')

const imagesDir = path.join(__dirname, 'src/assets/images')
// const publicDir = path.join(__dirname, 'public')

const getImages = (dir, callback) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw new Error('Unable to scan directory ' + err)
    }
    const images = []
    files.forEach((file) => {
      images.push(file)
    })
    callback(images)
  })
}

const getAllImages = async () => {
  const allImages = [imagesDir].map(async (dir) => {
    const images = await new Promise((res) => {
      getImages(dir, (images) => {
        res(images)
      })
    })
    return images
  })

  Promise.all(allImages).then((images) => {
    const mergeImages = images.flat(Infinity)
    const stream = fs.createWriteStream('public/all-images.txt')
    stream.once('open', () => {
      mergeImages.forEach((img) => {
        stream.write(img + '\n')
      })
      stream.end()
    })
  })
}

getAllImages()
