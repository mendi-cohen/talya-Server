class WhatsAppController {

    sendWhatsApp = async (req, res) => {
        const orderId = req.body.id; 
        try {
          await fetch(`https://api.green-api.com/waInstance${process.env.WHATSAPP_ID}/sendMessage/${process.env.WHATSAPP_TOKEN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              chatId: `972586086033@c.us`, 
              message: `מחכה לכם הזמנה באתר!  (הזמנה מספר ${orderId} מהאתר  ) כנסו לטפל בהזמנה: https://talya-project.netlify.app/  ` 
            })
          })
          .then(response => response.json())
          .then(data => {
            res.json(data);
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
          console.log(" השגיאה חלה בשליחת הוואצאפ ");
        }
      }
      
  }
  
  export default new WhatsAppController();
  