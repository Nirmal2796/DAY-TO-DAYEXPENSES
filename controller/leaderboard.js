const User = require('../models/user');

exports.getLeaderBoard = async (req, res) => {

    try {

        const leaderBoard=await User.find()
                                    .select('_id name totalExpenses')
                                    .sort({totalExpenses:-1})// -1 means descending
                                    .limit(10);

        // const leaderBoard = await User.findAll({
        //     attributes: ['id', 'name', 'totalExpenses'],
        //     order: [['totalExpenses', 'DESC']],
        //     limit: 10
        // });

        // console.log(leaderBoard);

        res.status(200).json(leaderBoard);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }

}

