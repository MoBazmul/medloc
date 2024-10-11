const Tesseract = require('tesseract.js')
const { exec } = require('child_process')
const produceMsg = require('../producer/extractedMedicineNamesProducer')

const handleScan = async(req, res) => {
  let extractedText
  const image = req.image
  if(!image) return res.sendStatus(400)

  async function recognizeTextFromImage(imagePath) {
    try {
      const { data: { text } } = await Tesseract.recognize(
        imagePath,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      );
      extractedText = text
    } catch (error) {
      console.error('Error recognizing text:', error);
    }
  }

  const scannedText = recognizeTextFromImage(image)
  
  function extractMedicineNames(text) {
    exec(`python3 extraction/medExtraction.py "${text}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return;
      }
  
      if (stderr) {
        console.error(`Error in Python script: ${stderr}`);
        return;
      }
  
      const medicineNames = stdout.trim().split(',');
      return medicineNames
    });
  }
    
  const medicineNames = extractMedicineNames(scannedText);
  produceMsg(medicineNames)
}

module.exports = { handleScan }
