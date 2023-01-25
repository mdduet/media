const INTERVAL_KEY = "INTERVAL_KEY";
// default to 1s refresh window
const DEFAULT_INTERVAL = "1000";

const NICS = [
    "https://phantom-marca.unidadeditorial.es/0c8caa911507fd590d1dba58a149aca5/crop/0x0/1059x706/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/23/16665279627938.png", // supes
    "https://elcomercio.pe/resizer/-1YegQVSHY2nAWmNqOZSI7HmCvQ=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/3TC7KWNTGVEN3K7SPO4ZUUEMMU.webp", // moonstruck
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiG7le9zQ1uSkSluteOUq6Bver5HBC9pHAqsdpHkPq1X5M2f7P6PrrCiocavc9ozjb-HA&usqp=CAU", // mandy
    "https://ajanskafkas.com/materyal/uploads/2021/06/Hasbulla-Magomedov.jpg", // hotty
    "https://www.avvisatore.it/wp-content/uploads/2022/05/Hasbulla-Magomedov-Wiki-Bio-Age.jpg", // freedom
    "https://www.avvisatore.it/wp-content/uploads/2022/05/Hasbulla-Magomedov-Wiki-Bio-Age.jpg", // pensive and blond
    "https://img.asmedia.epimg.net/resizer/PRyeS-TPIbct1Uo-5NQXEibVdbs=/360x203/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/VXIQMR5OGNMP5C7F7G5KSRHJ7Y.jpg", // more like face-on
    "https://assets.popbuzz.com/2021/36/how-old-is-hasbulla-magomedov-1631204014-view-0.png", // vamp kiss
    "https://www.clarin.com/img/2022/06/28/hasbulla-la-sensacion-viral-de___eVWrlN97S_2000x1500__1.jpg", // j-pig
    "https://i.pinimg.com/originals/e1/00/68/e10068bc74290b876c9ffac50baea3aa.jpg", // suave
    "https://i.pinimg.com/736x/95/f9/a7/95f9a79fac9703a691a79ba6a779898e.jpg", // black tie
    "https://i.pinimg.com/564x/21/f5/15/21f515338b19ca28395a5e3f1df05dfa.jpg", // goat tea
    "https://i.ytimg.com/vi/nTPLApqRN3s/mqdefault.jpg", // the thinker
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4-F7Iza1JHrE6OkWKKGD32WNlHajjleqEHSRHy3OihuJsZgnKd86JKIDDP405QtPPk8&usqp=CAU", // waxy
    "https://resizer.glanacion.com/resizer/ky4Yr_rpqxLgjmGH4ji9iHpXi8I=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/E63KK7I2JRCTVADIUNKMDTVPLM.jpg", // a present... for me?
    "https://www.infobae.com/new-resizer/gpMc8huZZnq5Z9GDyXL_mKZTu-s=/1200x900/filters:format(webp):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/SA255WF2DNFMDE6SAYZMNKCMCA.jpg", // my child's name is a state
    "https://elcomercio.pe/resizer/fIIRVi3UqB1E8pDNRcIpPTPt41Y=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5WR4V7VC5JHHRGAVREAEETH5C4.jpg", // mullets are back; trust me
    "https://pbs.twimg.com/media/E5YlXjFWYAExl3n?format=jpg&name=small", // cowboy cage
    "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2021/07/21/60f7d3db595e5.jpeg", // bless up
]

function getNic() {
    let nicNum = Math.floor(Math.random()*NICS.length);
    return NICS[nicNum];
}

function replaceImages() {
    for(let i = 0; i < document.images.length; ++i) {
        let img = document.images[i];

        if(img.classList.contains('nicced')){
            continue;
        }
        img.classList.add('nicced');

        // attempt to retain the original dimensions
        img.style.width = img.width + 'px';
        img.style.height = img.height + 'px';

        // nic-em
        let loc = getNic()
        img.src = loc;
        if(img.srcset){
            img.srcset = loc;
        }
    };
}

// setup defaults
function get_interval_or_default(item) {
    if (!item || item === {} || !(INTERVAL_KEY in item)) {
        browser.storage.local.set({
            INTERVAL_KEY: DEFAULT_INTERVAL
        });
        return DEFAULT_INTERVAL;
    } else {
        return item[INTERVAL_KEY];
    }
}

// start up the extension
browser.storage.local.get().then(
    (item) => {
        let interval = get_interval_or_default(item);
        window.setInterval(replaceImages, interval);
    },
    (_) => {
        window.setInterval(replaceImages, DEFAULT_INTERVAL);
    }
);
