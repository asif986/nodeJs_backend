db.products.aggregate([
    {
        $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "companyId",
            as: "companyInfo"
        },
    },
    {
        $project: {
            proPrice:1,
            companyName:{ $arrayElemAt:["$companyInfo.companyName",0]},
            mainProName: "$proNAme",

        }
    }
])