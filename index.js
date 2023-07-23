const fs = require('node:fs/promises')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const dirName = path.dirname(filePath)
  let isFolderCreated

  try {
    await fs.stat(dirName)
    isFolderCreated = true
  } catch {
    isFolderCreated = false
  }  
  
  if (!isFolderCreated) {
    try {
      await fs.mkdir(dirName, { recursive: true })
    } catch(err) {
      console.log(`Error al crear el directorio: ${err}`)
      callback(err)
    }
  }
    
  fs.writeFile(filePath, data)
    .then((file) => {
      callback(null, file)
    })
    .catch((err) => {
      console.log(`Error al crear el archivo: ${err}`)
      callback(err)
    })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (!word) {
    const err = new Error('No se ha especificado la palabra a buscar')
    return callback(err)
  }

  const filePath = process.argv[2]
  if (!filePath) {
    const err = new Error('No se ha especificado el path del archivo')
    return callback(err)
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    callback(null, content.split(word).length-1)
  } catch {
    callback(null, 0)
  }  

}

module.exports = {
  writeFile,
  readFileAndCount
}
