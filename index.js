let express = require('express');

// body dùng để để data lên sever
let body = require('body-parser');

// tạo app để cấu hỉnh router
let app = express();
app.use(body.json());
app.use(body.urlencoded({extended: true}));
let mongoose = require('mongoose');

// kết nối với data mongoose
mongoose.connect('mongodb+srv://thuan:thuan123456@cluster0.25fre.mongodb.net/TourIntro?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function () {
    console.log('Mongoose is connected');
});

// import các schema ở mục model
let categoriesSchema = require('./model/categoriesSchema');
let languagesSchema=require('./model/languagesSchema');


// tạo collision trong code
let Category = mongoose.model('category', categoriesSchema, 'categories');
let Languages = mongoose.model('language', languagesSchema, 'languages');


//chạy lên local host với port là 1212
app.listen(process.env.PORT || 1212);
console.log('Localhost: 1212');
app.get('/login1', function (req, res) {

    var kq = "3746347";
    res.send("HaHa: " + kq);
});

//lây danh sách tour
app.get('/get-tour-list', async (req, res) => {
    let vi="5fb29dcf5fea350ad4f00734";
    let en="5fb29ddc5fea350ad4f00735";
    let ko="5fb29de95fea350ad4f00736";
    let ch="5fb29df35fea350ad4f00737";
    let fr="5fb29dfd5fea350ad4f00738";
    let ind="5fb29e0a5fea350ad4f00739";
    let ja="5fb29e155fea350ad4f0073a";
    let ge="5fb29e1d5fea350ad4f0073b";
    let ru="5fb29e285fea350ad4f0073c";

   let languge = req.query.languge;
    let list_tour = await Category.find().populate('languages').where({lang_id:languge});
    res.send(list_tour);
});

app.post('/add-category', async (req, res) => {
    let cate_name = req.body.cate_name;
    let router = req.body.router;

    try {
        const addCategory = new Category({
            cate_name: cate_name,
            router: router
        });

        if (!addCategory) {
            res.status(400).json({
                message: 'Thêm thất bại!'
            })
        } else {
            await addCategory.save();
            res.json({
                message: 'Thêm thành công!'
            })
        }
    } catch (e) {
        res.status(400).json({
            message: 'Lỗi: ' + e
        })
    }
});
