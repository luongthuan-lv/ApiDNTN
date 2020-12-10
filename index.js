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
let languagesSchema = require('./model/languagesSchema');
let tourSchema = require('./model/tourSchema');
let reportSchema = require('./model/reportSchema');

// tạo collision trong code
let Category = mongoose.model('category', categoriesSchema, 'categories');
let Languages = mongoose.model('language', languagesSchema, 'languages');
let Tour = mongoose.model('tour', tourSchema, 'tours');
let Report = mongoose.model('report', reportSchema, 'reports');


//chạy lên local host với port là 1212
app.listen(process.env.PORT || 1212);
console.log('Localhost: 1212');
app.get('/', function (req, res) {

    var kq = "3746347";
    res.send("HaHa: " + kq);
});

//lây danh sách tour
app.get('/get-tour-list', async (req, res) => {
// truyền biến vào postman thì sẽ là language="......", không phải là lang="...."
    let lang = req.query.language;
    let list_tour = await Category.find().populate('languages').where({lang_id: lang});
    res.send(list_tour);
});

app.get('/get-place-list', async (req, res) => {
    let lang = req.query.language;
    let cate = req.query.category;
    let list_place = await Tour.find().populate('languages').populate('categories').where({
        lang_id: lang,
        vehicle_id: cate
    });
    res.send(list_place);
});
app.post('/add-report', async (req, res) => {
    var user = req.body.user;
    var vehicle = req.body.vehicle;
    var star = req.body.star;
    var report = req.body.report;
    var username = req.body.name;
    var avatar = req.body.avatar;
    var date = req.body.date;

    const data = new Report({
        user: user,
        tour: vehicle,
        star: star,
        report: report,
        username: username,
        avatar: avatar,
        date: date
    });
    let condition = {
        user: user,
        tour: vehicle,
    };
    const rp = await Report.findOne(condition);
    if (!rp) {
        await data.save();
        res.send('0');
    } else {
        await Report.findOneAndUpdate(condition, ({
            star: star,
            report: report,
            username: username,
            avatar: avatar,
            date: date
        }));
        res.send('1')
    }
});

app.get('/get-all-report', async (req, res) => {
    let tour = req.query.vehicle;
    let allReport = await Report.find({tour: tour});
    res.send(allReport);
});




