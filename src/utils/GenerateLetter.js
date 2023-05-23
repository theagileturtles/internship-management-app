import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import generateUUID from './GenerateUUID';

const generateFile = async (element) => {
  const name = convertTurkishToEnglish(element.firstName)
  const surname = convertTurkishToEnglish(element.lastName)
  const company = convertTurkishToEnglish(element.company)
  const drName = "Dr. Kristin Surpuhi Benli" // this will be taken from session
  const date = getCurrentDate()

  const templateTop = `${date}`;
  const templateTo = `To ${company},`;
  const templateMain = `     ${name + " " + surname}, who has applied to your department for a summer internship, is studying at Üsküdar University, Faculty of Engineering and Natural Sciences, Software Engineering Department. In the Software Engineering department, there are two compulsory internships, one at the end of the second year and the other at the end of the third year. The duration of each compulsory internship is 20 working days. Work Accident and Occupational Diseases Insurance Premiums between the dates of internship of the student are covered by our University. The named student has ${element.incompleteInternships} compulsory internships. This document has been prepared to inform your institution.`;
  const templateBottom = `Software Engineering Internship Committee Member`;
  const templateBottom2 = `${drName}`;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the document
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 0.1;

  // Set the page dimensions to A4 size (595.276 x 841.890 points)
  page.setSize(595.276, 841.890);

  // Draw the date in the top right corner
  const topRightX = page.getWidth() - 120 - font.widthOfTextAtSize(templateTop, fontSize); // Adjust the value 80 for the desired distance
  page.drawText(templateTop, {
    x: topRightX,
    y: page.getHeight() - 70,
    font: font,
    fontSize: fontSize,
    color: rgb(0, 0, 0),
  });

  // Draw the "To" text
  page.drawText(templateTo, {
    x: 50,
    y: page.getHeight() - 120,
    font: font,
    fontSize: fontSize,
    color: rgb(0, 0, 0),
    maxWidth: page.getWidth() - 100,
    lineHeight: fontSize + 18, // Increase line spacing here
  });

  // Add 2 lines of spacing between "To" and the main text
  const lineSpacing = fontSize + 18;
  let yMain = page.getHeight() - 120 - lineSpacing * 4;

  // Draw the main text
  const linesMain = templateMain.split('\n');
  for (const line of linesMain) {
    const textWidth = font.widthOfTextAtSize(line, fontSize);
    page.drawText(line, {
      x: 50,
      y: yMain,
      font: font,
      fontSize: fontSize,
      color: rgb(0, 0, 0),
      maxWidth: page.getWidth() - 100,
      lineHeight: fontSize + 30, // Increase line spacing here
    });
    yMain -= fontSize + 18; // Increase line spacing here
  }

  // Add 1 line of spacing between bottom lines
  let yBottom = 50 - lineSpacing;

  // Draw the bottom text
  const linesBottom = [templateBottom2, templateBottom];
  for (const line of linesBottom) {
    const textWidth = font.widthOfTextAtSize(line, fontSize);
    //const bottomRightX = page.getWidth() - 220 - textWidth; // Adjust the value 80 for the desired distance
    page.drawText(line, {
      x: 50,
      y: yBottom,
      font: font,
      fontSize: fontSize,
      color: rgb(0, 0, 0),
      maxWidth: page.getWidth() - 100,
      lineHeight: fontSize + 18, // Increase line spacing here
    });
    yBottom += fontSize + 18 * 3; // Increase line spacing here
  }

  // Save the PDF document as a binary array
  const pdfBytes = await pdfDoc.save();
  const uuid = generateUUID()
  // Generate a unique file name
  const fileName = `official_letter_${uuid}.pdf`; // Example file name based on element values and UUID

  // Create a Blob with the PDF bytes
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Return the generated file data
  return {
    name: fileName,
    url: url,
  };
};

function convertTurkishToEnglish(text) {
    const turkishCharacters = 'ÇçĞğİıÖöŞşÜü';
    const englishCharacters = 'CcGgIiOoSsUu';
  
    let convertedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const turkishIndex = turkishCharacters.indexOf(char);
  
      if (turkishIndex !== -1) {
        const englishChar = englishCharacters[turkishIndex];
        convertedText += englishChar;
      } else {
        convertedText += char;
      }
    }
  
    return convertedText;
}
  
function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
}

export default generateFile;
