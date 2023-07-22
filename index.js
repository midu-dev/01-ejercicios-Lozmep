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
    .then((file) => {
      callback('', file)
    })
    .catch(() => {
      console.log(`Error al crear el archivo: ${err}`)
      process.exit(1)
    })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (!word) {
    callback('No se ha especificado la palabra a buscar')
    process.exit(1)
  }

  const filePath = process.argv[2]
  if (!filePath) {
    callback('No se ha especificado el path del archivo')
    process.exit(1)
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    callback('', content.split(' ').length)
  } catch {
    callback('', 0)
  }  

}

module.exports = {
  writeFile,
  readFileAndCount
}
