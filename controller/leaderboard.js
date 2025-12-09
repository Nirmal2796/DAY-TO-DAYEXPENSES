const User = require('../models/user');

exports.getLeaderBoard = async (req, res) => {

    try {

        const leaderBoard=await User.find()
                                    .select('_id name totalExpenses') // Return only _id, name, and totalExpenses fields
                                    .sort({totalExpenses:-1})// -1 means descending and 1 for ascending 
                                    .limit(10);

        res.status(200).json(leaderBoard);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }

}

