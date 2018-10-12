import React from 'react'

import update from 'immutability-helper';
import JSZip from 'jszip';
import filesaver from 'file-saver';
import classNames  from 'classnames';
import Notifications, {notify} from 'react-notify-toast';

import Upload from './Upload'
import Settings from './Settings'
import Preview from './Preview'

import {
    LOGO_NAME,
    logoBaseFunction,
    markupFunction,
    DEFAULT_TITLE,
    DEFULT_BUTTON_CAPTION
} from './helpers'

// images
import LogoPng from './images/logo.png';

// styles
import css from './App.sss'


const transliterate = (word) => {
    let answer = "", a = {};

    a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
    a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
    a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
    a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
    a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
    a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";a[" "]="_";

    for (let i = 0; i < word.length; i++) {
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined){
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer;
};


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            uploadedItems: [],
            settings: {
                portal: 'prom',
                resource: 'default',
                banner_url: '',
                banner_title: DEFAULT_TITLE,
                text_position: 'left',
                text_color: 'black',
                text_size: '1',
                price_type: 'yellow',
                price_size: '1',
                price_position: 'pre-top-pre-right',
                cycle_animation: true,
                animation_delay: '2000',
                google_button: false,
                apple_button: false,
                buttons_app_bg: 'black',
                buttons_app_lang: 'ru',
                banner_bg: 'purple',
                button_bg: 'orange',
                button_contour: false,
                button_text: DEFULT_BUTTON_CAPTION,
                border_color: 'none',
                border_width: '4',
            },
            view: [
                '240x400',
            ],
        };
    }


    handleNotify = (text, type) => {
        notify.show(text, type);
    }


    handleChangeSize = (e) => {
        this.setState({
            view: [e.target.value]
        });
    };


    handleChangeSettings = (name, value) => {
        let newSettings = update(this.state.settings, {
            [name]: {$set: value}
        });
        this.setState({
            settings: newSettings,
        });
    }


    handleUpload = (items) => {
        this.setState({
            uploadedItems: items,
        });
    }


    handleZipHTMLCreate = () => {
        this.setState({
            loading: true,
        });

        const isYandex = this.state.settings.resource === 'yandex';

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();

        const bannerTitle = transliterate(this.state.settings.banner_title);
        const zipName = 'html_' + bannerTitle + '_' + date + '.zip';

        let zip = new JSZip();

        const markupContent = markupFunction(this.state.uploadedItems, this.state.settings, this.state.view, true);

        for (let i = 0; i < this.state.uploadedItems.length; i++) {
            const fileName = this.state.uploadedItems[i].name;
            const fileData = this.state.uploadedItems[i].src.split('base64,')[1];
            zip.file(fileName, fileData, {base64: true});
        };
        
        const logoSrc = logoBaseFunction(this.state.settings.portal, this.state.settings.banner_bg === 'white');
        const logoData = logoSrc.split('base64,')[1];
        zip.file(LOGO_NAME, logoData, {base64: true});
        zip.file("index.html", markupContent);
        zip.generateAsync({type:"blob"})
        .then((content) => {
            filesaver.saveAs(content, zipName);
            this.setState({
                loading: false,
            });
        });
    }


    render() {
        const currentTime = new Date();
        const settingsClasses = classNames(
            css.contentLine,
            {
                [css.contentLineDisabled]: this.state.uploadedItems.length == 0,
            },
        )
        const previewClasses = classNames(
            css.contentLine,
            {
                [css.contentLineDisabled]: this.state.uploadedItems.length == 0,
            },
        )
        
        return (
            <div className={css.root}>
                <div className={css.header}>
                    <div className={css.wrapper}>
                        <img
                            className={css.logo}
                            src={LogoPng}
                            alt=''
                        />
                    </div>
                </div>
                <div className={css.container}>
                    <div className={css.wrapper}>
                        <h1 className={css.title}>
                            Для создания баннера, загрузите изображения товаров
                        </h1>
                        <div className={css.contentLine}>
                            <Upload
                                items={this.state.uploadedItems}
                                onNotify={this.handleNotify}
                                onUpload={this.handleUpload}
                                onItemInputChange={this.handleItemInputChange}
                            />
                        </div>
                        <div className={settingsClasses}>
                            <Settings
                                items={this.state.uploadedItems}
                                settings={this.state.settings}
                                onChangeSettings={this.handleChangeSettings}
                                onNotify={this.handleNotify}
                            />
                        </div>
                    </div>
                    <div className={previewClasses}>
                        <Preview
                            items={this.state.uploadedItems}
                            settings={this.state.settings}
                            view={this.state.view}
                            onChangeSize={this.handleChangeSize}
                            onToggleSaveType={this.handleToggleSaveType}
                        />
                    </div>
                    {this.state.uploadedItems.length > 0 &&
                        <div className={css.download}>
                            <button
                                className={css.downloadButton}
                                onClick={this.handleZipHTMLCreate}
                            >
                                <span className={css.downloadButtonText}>
                                    Скачать архив с HTML
                                </span>
                            </button>
                        </div>
                    }
                </div>
                <div className={css.footer}>
                    <div className={css.wrapper}>
                        <div className={css.copyright}>
                            &copy; 2017-{currentTime.getFullYear()}
                        </div>
                    </div>
                </div>
                {this.state.loading && <div className={css.loading} />}
                <Notifications />
            </div>
        );
    };
};