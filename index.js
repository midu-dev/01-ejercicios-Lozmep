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
      process.exit(1)
    }
  }
    
  fs.writeFile(filePath, data)
    .then(() => {
      callback
    })
    .catch(() => {
      console.log(`Error al crear el archivo: ${err}`)
      process.exit(1)
    })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {

}

module.exports = {
  writeFile,
  readFileAndCount
}
