const { json } = require ('body-parser')
const fs = require ('fs');
var express = require ('express');
var app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Probando Endpoint en puerto 5500',
        success: true
    })
});

app.get('/products', (req, res) => {
    fs.readFile("./product/all.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/cart_buy', (req, res) => {
    fs.readFile("./cart/buy.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/cart_info', (req, res) => {
    fs.readFile("./cart/987.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/cart_products', (req, res) => {
    fs.readFile("./cart/654.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/categories', (req, res) => {
    fs.readFile("./category/all.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/category_info', (req, res) => {
    fs.readFile("./category/1234.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/product_info', (req, res) => {
    fs.readFile("./product/5678.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/product_info_comments', (req, res) => {
    fs.readFile("./product/5678-comments.json", "utf-8", function(err,server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.get('/publish_product', (req, res) => {
    fs.readFile("./product/publish.json", "utf-8", function(err, server) {
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            server: JSON.parse(server),
            success: true
        })

    }); 

});

app.listen(5500, () => {
    console.log('Probando Endpoint en puerto 5500')
});
