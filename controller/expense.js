const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const Expense = require('../models/expense');

const pageDataService=require('../services/pageDataService');



exports.getExpenses = async (req, res) => {
    try {
        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit) ;

        const totalExpenses=await Expense.countDocuments({userId:req.user._id});

        const offset=(page-1) * expenses_per_page;
        const limit=expenses_per_page;


        const expenses=await Expense.find({userId:req.user._id})
                        .skip(offset)  // Skip records for pagination
                        .limit(limit); // Limit number of records returned

        // const expenses = await UserServices.getExpenses(req,{
        //     offset:(page-1) * expenses_per_page, //skip the rows of data 
        //     limit:expenses_per_page
        // });


        // const pageData=pageData(page,expenses_per_page,totalExpenses);

        res.status(200).json({expenses,pageData:pageDataService.pageData(page,expenses_per_page,totalExpenses)});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
}

exports.addExpense = async (req, res) => {

        // const t= await sequelize.transaction();

    try {

        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;

        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit) ;

       
        const totalExpensesUser =  req.user.totalExpenses + Number(amount);
        
        // console.log(totalExpenses);


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Give me one category for ${description}. i am trying to create expense tracker. Focus on the item, not the activity or context. Return only one category. Use one simple word or two-word category .No explanation`,
        });

        // console.log(response.text);

        const expense = new Expense({ //create an object 
            amount: amount,
            category: response.text,
            description: description,
            date: new Date(),
            userId:req.user
        });

        req.user.totalExpenses=totalExpensesUser; //updating totalExpense of the user

        await expense.save(); //create document by calling save method on that object.
        await req.user.save();  //saving totalExpense of the user

        // await req.user.update({totalExpenses:totalExpensesUser},{transaction:t});


        // await t.commit(); // if we dont commit it will not change anything in db it will keep as it is.


        const totalExpensesPage = await Expense.countDocuments({userId:req.user._id});

        // const pageData=pageData(page,expenses_per_page,totalExpensesPage);


        res.status(201).json({ newExpense: expense , pageData:pageDataService.pageData(page,expenses_per_page,totalExpensesPage)});
    }
    catch (err) {
        // await t.rollback();
        console.log(err);
        res.status(500).json({success:false});
    }

}

exports.deleteExpense = async (req, res) => {

    // const t= await sequelize.transaction();

    try {

        const id = req.params.id;

        const page=Number(req.query.page) || 1;
        const expenses_per_page=Number(req.query.limit) ;


        const expense = await Expense.findById(id);

        // console.log(id);

        const totalExpenses =  req.user.totalExpenses - Number(expense.amount);

        req.user.totalExpenses=totalExpenses;


        await expense.deleteOne(); //delete the document and returns operation info not the deleted document
        await req.user.save(); //updating the totalexpenses

        // await req.user.update({totalExpenses:totalExpenses},{transaction:t});
        // console.log(expense);

        
        // expense[0].destroy();

        // await t.commit();

        const totalExpensesPage= await Expense.countDocuments({userId:req.user._id});

        // const pageData=pageData(page,expenses_per_page,totalExpensesPage);


        // await t.commit();

        res.status(200).json({expense,pageData:pageDataService.pageData(page,expenses_per_page,totalExpensesPage)});
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json({success:false});
    }
}

