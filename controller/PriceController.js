import puppeteer from 'puppeteer';
import priceModel from "../database/models/priceModel.js"
const fetchPrice = async (req, res) => {
    
    try {
        const currentPrice = await scrapPrice("https://www.dspim.com/invest/mutual-fund-schemes/equity-funds/nifty-smallcap250-quality-50-index-fund/dnsqf-regular-growth")
        // const currentPrice = 11
        const data = await priceModel.find()
        let diffPercentage = 0
        
        const ath = data[0]?.ath
        if (data == [] | !ath) {
            (await priceModel.create({ath:currentPrice})).save()
        } else {
            if(currentPrice > ath){    
              await priceModel.updateOne({_id:data[0]._id},{$set:{ath:currentPrice}})
            }
                diffPercentage = (currentPrice - ath)/ath * 100          
        }
        res.status(200).json({"fundName":"DSP Nifty Smallcap250 Quality 50 Index Fund", "BuyCall": true ? diffPercentage <= -5:false, "ath": ath, "currentPrice": currentPrice, "DiffPercentage": diffPercentage });
        
    } catch (error) {
        res.status(400).json({"message":error});
    }
    
    
};

const scrapPrice = async (url)=>{
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('#past-div-adj-nav', { visible: true });

    const price = await page.$eval('#past-div-adj-nav', el => el.textContent);
    console.log('Price:', price);

    await browser.close();
    return price
}

export { fetchPrice };
