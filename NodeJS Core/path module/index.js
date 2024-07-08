const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('укажите путь к файлу в аргументы коомандной строки.');
  process.exit(1);
}

const filePath = args[0];

const dirName = path.dirname(filePath);

const fileExt = path.extname(filePath);

console.log(`директория: ${dirName}`);
console.log(`расширение файла: ${fileExt}`);
