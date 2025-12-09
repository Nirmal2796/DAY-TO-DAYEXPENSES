const Expense = require('../models/expense');

const sequelize = require('../util/database');
const { Op } = require("sequelize");


const UserServices=require('../services/userServices');
const pageDataService=require('../services/pageDataService');

exports.getReport = async (req, res) => {
    try {
        const date = req.params.date;

        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit) ;

        const start=new Date(date);
        const end=new Date(date);
        end.setDate(end.getDate()+1);

         const [totalExpenses,expenses]=await Promise.all([

                                    Expense.countDocuments({ //count of total Expense for that date
                                            userId:req.user,
                                            date:{$gte:start ,$lt:end }
                                             }),

                                    Expense.find({  //Expenses of that date
                                        userId:req.user,
                                        date:{$gte:start ,$lt:end }
                                    })
                                    .skip((page-1) * expenses_per_page)
                                    .limit(expenses_per_page )

                                ]);


           
            const pageData=pageDataService.pageData(page,expenses_per_page,totalExpenses);

            res.status(200).json({expenses,pageData});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
}

exports.getMonthReport = async (req, res) => {
    try {
        const month = req.query.month;
        const year = req.query.year;

        console.log(month,year);

        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit);

        //JavaScript months 0-based
        const start=new Date(year,month-1,1);
        const end=new Date(year,month,1);

        const [totalExpenses,expenses]=await Promise.all([

                                    Expense.countDocuments({ //count of total Expense for that month
                                            userId:req.user,
                                            date:{$gte:start ,$lt:end }
                                             }),

                                    Expense.find({  //Expenses of that month
                                        userId:req.user,
                                        date:{$gte:start ,$lt:end }
                                    })
                                    .skip((page-1) * expenses_per_page)
                                    .limit(expenses_per_page )
                                ]);

        const pageData=pageDataService.pageData(page,expenses_per_page,totalExpenses);

        
        res.status(200).json({expenses,pageData});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
}

exports.getYearReport = async (req, res) => {
    try {

        const year = req.params.year;

        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit) ;

        const start=new Date(year,0,1);
        const end=new Date(year+1,0,1);

        const [totalExpenses,expenses]=await Promise.all([

                                    Expense.countDocuments({  //count of total Expense for that year
                                            userId:req.user,
                                            date:{$gte:start ,$lt:end }
                                             }),

                                    Expense.find({ //Expenses of that year
                                        userId:req.user,
                                        date:{$gte:start ,$lt:end }
                                    })
                                    .skip((page-1) * expenses_per_page)
                                    .limit(expenses_per_page )
                                ]);

 

        const pageData=pageDataService.pageData(page,expenses_per_page,totalExpenses);

        res.status(200).json({expenses,pageData});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
}




