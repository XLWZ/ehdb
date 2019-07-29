ExHentai gallery metadata  
Before you clone,Make sure you have git lfs installed, This repo is about 2GB large  
**You can also download json data file from [Mega](https://mega.nz/#F!oh1U0SIA!WBUcf3PaOvrfIF238fnbTg)**

# Usage
## Website
[Example website](https://ihentai.moe)  
Make sure you have `gdata.json` file and place it under `/site/server`  
Run `docker-compose up` and you can visit `http://localhost:8080`  
If you're willing to dev the website, you can switch to `website` branch
![website](website.png)

## Thumb images
You might want to download all the thumb images just in case `ehgt.org` will not able to visit

## Raw data
Get `gdata.json` or `gdata.pickle` for raw data  
`./site/server/database.sqlite` for a sqlite db file, this file was generated from `gdata.json`, if you're worried about the security issue, you can go with `gdata.json`

### Data structure example
```JSON
{
    "1452873": {
        "gid": 1452873,
        "token": "270ea074c2",
        "archiver_key": "434484--d3a5cb530202df82b3ecce4e73535ef8ead3bff9",
        "title": "[Jason B. Thompson] 울타르의 고양이 / The Cats of Ulthar",
        "title_jpn": "[Jason B. Thompson]  The Cats of Ulthar",
        "category": "Non-H",
        "thumb": "https://ehgt.org/7c/53/7c535f8e97231875d42ee022c8853dcca533b903-498579-900-1134-jpg_l.jpg",
        "uploader": "hbh3996",
        "posted": "1564136953",
        "filecount": "8",
        "filesize": 3767396,
        "expunged": false,
        "rating": "1.00",
        "torrentcount": "0",
        "tags": [
            "language:korean",
            "parody:cthulhu mythos",
            "comic"
        ]
    }
}
```

**Huge thanks for [Sachia Lanlus](https://forums.e-hentai.org/index.php?showuser=2351915) who provide this gallery meta data**  

[![thanks](thanks.png)](https://forums.e-hentai.org/index.php?showuser=2351915)
