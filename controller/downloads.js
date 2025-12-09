const S3Services = require('../services/S3Services');
const pageDataService = require('../services/pageDataService');

const Downloads = require('../models/downloads');
const Expense = require('../models/expense');


exports.downloadReport = async (req, res) => {
    try {
        const date = req.params.date;

        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        const expenses = await Expense.find({ //get all expenses of that date
            userId: req.user,
            date: { $gte: start, $lt: end }
        });

        const stringifiedExpenses = JSON.stringify(expenses);

        const fileName = `${req.user.id}/${new Date()}.txt`;  //folder/date.txt ;

        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName); //upload it

        console.log(fileURL);

        await new Downloads({ //instantiate object
            date: new Date(),
            fileURL: fileURL
        }).save(); //save it.


        res.status(200).json({ fileURL: fileURL, success: true });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: '', success: false, err: err });
    }
}


exports.downloadMonthlyReport = async (req, res) => {
    try {
        const month = req.query.month;
        const year = req.query.year;

        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month + 1, 1);

        const expenses = await Expense.find({ //get all expenses of that month
            userId: req.user,
            date: { $gte: start, $lt: end }
        });

        const stringifiedExpenses = JSON.stringify(expenses);

        const fileName = `${req.user.id}/${new Date()}.txt`;

        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName); //upload it

        await new Downloads({  //instantiate object
            date: new Date(),
            fileURL: fileURL
        }).save(); //save it.

        res.status(200).json({ fileURL: fileURL, success: true });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: '', success: false });
    }
}


exports.downloadYearlyReport = async (req, res) => {
    try {
        const year = req.params.year;

        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const expenses = await Expense.find({  //get all expenses of that year
                                        userId: req.user,
                                        date: { $gte: start, $lt: end }
                                    });

        const stringifiedExpenses = JSON.stringify(expenses);

        const fileName = `${req.user.id}/${new Date()}.txt`;

        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);  //upload it

        await new Downloads({  //instantiate object
            date: new Date(),
            fileURL: fileURL
        }).save(); //save it.

        res.status(200).json({ fileURL: fileURL, success: true });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: '', success: false });
    }
}


exports.showDownloads = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const downloads_per_page = Number(req.query.limit);

        const [totalDownloads,downloads] = await Promise.all([ 
                                            Downloads.countDocuments({userId: req.user}),
                                            Downloads.find()
                                            .skip((page - 1) * downloads_per_page)
                                            .limit(downloads_per_page)
                                        ]);


        const pageData = pageDataService.pageData(page, downloads_per_page, totalDownloads);


        res.status(200).json({ downloads, pageData });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
}