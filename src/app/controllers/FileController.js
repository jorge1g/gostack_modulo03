// Importar File
import File from '../models/File';

// Criado classe filecontroller
class FileController {
  // Metodo store que estava em routes
  async store(req, res) {
    // Desestruturando para pegar reqs de File
    const { originalname: name, filename: path } = req.file;
    // Definindo file
    const file = await File.create({
      name,
      path,
    });
    // Retornando res.json passando este file
    return res.json(file);
  }
}
// Expportação padrão
export default new FileController();
