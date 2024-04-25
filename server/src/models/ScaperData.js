import mongoose from 'mongoose';

const scraperDataSchema = new mongoose.Schema({
    data: [{
        title: String,
        content: String,
        publish_date: String,
        link: String,
    }]
});

const dashboardDB = mongoose.connection.useDb("dashboard");
const ScraperData = dashboardDB.model('scraper_datas', scraperDataSchema);

export default ScraperData;