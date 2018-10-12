import React from 'react';

import update from 'immutability-helper';
import classNames  from 'classnames';

import Checkbox from '../UI/Checkbox';
import RadioButton from '../UI/RadioButton';
import ColorRadio from '../UI/ColorRadio';
import Input from '../UI/Input';
import Hint from '../UI/Hint';
import SelectPosition from '../UI/SelectPosition';

// styles
import css from './Settings.sss';


export default class Settings extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            loading: false,
            settings: this.props.settings,
        };
    }
 
    handleChangeInput = (name, value, type='text', action='change') => {
        if (action === 'change') {
            let newSettings = update(this.state.settings, {
                [name]: {$set: value}
            });
            this.setState({
                settings: newSettings,
            });
        } else if (action === 'blur') {
            if (type === 'number') {
                let regex = /^[0-9]+$/;
                if ( !value.match(regex)) {
                    this.props.onNotify('Ошибка ввода данных', 'warning');
                    this.setState({
                        settings: this.props.settings,
                    });
                    return false;
                }
            }
            this.props.onChangeSettings(name, value)
        }
    }

    handleChangeNumberInput = (e) => {
        let value = e.target.value;

        {this.props.onChangeSettings(e.target.name, e.target.value)};
    }

    handleChangeCheckbox = (e) => {
        {this.props.onChangeSettings(e.target.name, e.target.checked)};
    }

    handleChange = (e) => {
        {this.props.onChangeSettings(e.target.name, e.target.value)};
    }


    render() {
        const { settings } = this.props;

        let noItemsPrice = true;
        for (var i = 0; i < this.props.items.length; i++) {
            if (this.props.items[i].price) noItemsPrice = false;
        };
        
        return (
            <div className={css.root}>
                <div className={css.title}>
                    Настройки
                </div>
                <div className={css.body}>
                    <div className={css.bodyRow}>
                        <div
                            className={classNames({
                                [css.column]: true,
                                [css.columnDisabled]: settings.resource !== 'default',
                            })
                        }>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Введите URL
                                    <Hint>URL адрес, по коорому будут переходить, при клике на баннер</Hint>
                                </span>
                                <Input
                                    value={settings.resource === 'default' ? settings.banner_url : '#'}
                                    name='banner_url'
                                    type='text'
                                    id='banner_url'
                                    placeholder='http://example.com'
                                    onChange={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text')}
                                    onBlur={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text', 'blur')}
                                />
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Выберите ресурс
                                    <Hint>Для размещения баннера на определенных ресурсах необходимо придерживаться определенных правил</Hint>
                                </span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.resource === 'default'}
                                            value='default'
                                            name='resource'
                                            text='Не выбрано'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.resource === 'yandex'}
                                            value='yandex'
                                            name='resource'
                                            text='Yandex'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={css.bodyRow}>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Портал
                                    <Hint>Для какого из сайтов делать баннера, такой логотип и будет отображаться на баннере(Prom, Tiu.ru, Deal, Satu) и соответсвенно меняется значение валюты(грн, тг, руб.)</Hint>
                                </span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.portal === 'prom'}
                                            value='prom'
                                            name='portal'
                                            text='Prom'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.portal === 'tiu'}
                                            value='tiu'
                                            name='portal'
                                            text='Tiu'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.portal === 'deal'}
                                            value='deal'
                                            name='portal'
                                            text='Deal'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.portal === 'satu'}
                                            value='satu'
                                            name='portal'
                                            text='Satu'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Основной фон</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'purple'}
                                            value='purple'
                                            name='banner_bg'
                                            color='#4854a2'
                                            color2='#772088'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'orange'}
                                            value='orange'
                                            name='banner_bg'
                                            color='#ff4335'
                                            color2='#ff8c00'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'helloween'}
                                            value='helloween'
                                            name='banner_bg'
                                            color='#6A1B89'
                                            color2='#FFAA00'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'rednewyear'}
                                            value='rednewyear'
                                            name='banner_bg'
                                            color='#370006'
                                            color2='#9c0010'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'bluenewyear'}
                                            value='bluenewyear'
                                            name='banner_bg'
                                            color='#0F1D42'
                                            color2='#587ECD'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'spring'}
                                            value='spring'
                                            name='banner_bg'
                                            color='#e14fad'
                                            color2='#f9d423'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'healthweek'}
                                            value='healthweek'
                                            name='banner_bg'
                                            color='#4CB748'
                                            color2='#25DFE2'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'sales'}
                                            value='sales'
                                            name='banner_bg'
                                            color='#82BAF7'
                                            color2='#F578DC'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'white'}
                                            value='white'
                                            name='banner_bg'
                                            color='#fff'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={css.bodyRow}>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Введите общий заголовок
                                    <Hint>Основной заголовок баннера</Hint>
                                </span>
                                <Input
                                    value={this.state.settings.banner_title}
                                    name='banner_title'
                                    type='text'
                                    id='banner_title'
                                    placeholder='Заголовок'
                                    onChange={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text')}
                                    onBlur={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text', 'blur')}
                                />
                            </div>
                        </div>
                        <div className={css.column}>
                            <div
                                className={classNames({
                                    [css.row]: true,
                                    [css.rowDisabled]: settings.banner_bg !== 'white',
                                })
                            }>
                                <span className={css.label}>Цвет текста</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'white' && settings.text_color === 'black'}
                                            value='black'
                                            name='text_color'
                                            color='#333'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'white' && settings.text_color === 'purple'}
                                            value='purple'
                                            name='text_color'
                                            color='#8547A8'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.banner_bg === 'white' && settings.text_color === 'blue'}
                                            value='blue'
                                            name='text_color'
                                            color='#4C519D'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={css.bodyRow}>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Размер текста</span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '0.8'}
                                            value='0.8'
                                            name='text_size'
                                            text='0.8'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '0.9'}
                                            value='0.9'
                                            name='text_size'
                                            text='0.9'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '1'}
                                            value='1'
                                            name='text_size'
                                            text='1.0'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '1.1'}
                                            value='1.1'
                                            name='text_size'
                                            text='1.1'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '1.2'}
                                            value='1.2'
                                            name='text_size'
                                            text='1.2'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_size === '1.3'}
                                            value='1.3'
                                            name='text_size'
                                            text='1.3'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Положение текста
                                    <Hint>Расположение блока c текстом на определенных размерах баннера</Hint>
                                </span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_position === 'left'}
                                            value='left'
                                            name='text_position'
                                            text='слева'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.text_position === 'right'}
                                            value='right'
                                            name='text_position'
                                            text='справа'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={classNames({
                            [css.bodyRow]: true,
                            [css.bodyRowDisabled]: noItemsPrice,
                        })
                    }>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Тип ценника</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!noItemsPrice && settings.price_type === 'yellow'}
                                            value='yellow'
                                            name='price_type'
                                            color='#F4C12C'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!noItemsPrice && settings.price_type === 'white'}
                                            value='white'
                                            name='price_type'
                                            color='#fff'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div
                                className={classNames({
                                    [css.row]: true,
                                    [css.rowDisabled]: settings.price_type === 'white',
                                })
                            }>
                                <span className={css.label}>
                                    Размер ценника
                                </span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '0.8'}
                                            value='0.8'
                                            name='price_size'
                                            text='0.8'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '0.9'}
                                            value='0.9'
                                            name='price_size'
                                            text='0.9'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '1'}
                                            value='1'
                                            name='price_size'
                                            text='1.0'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '1.1'}
                                            value='1.1'
                                            name='price_size'
                                            text='1.1'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '1.2'}
                                            value='1.2'
                                            name='price_size'
                                            text='1.2'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <RadioButton
                                            checked={settings.price_size === '1.3'}
                                            value='1.3'
                                            name='price_size'
                                            text='1.3'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className={classNames({
                                [css.column]: true,
                                [css.columnDisabled]: settings.price_type === 'white',
                            })
                        }>
                            <div className={css.row}>
                                <span className={css.label}>Положение ценника</span>
                                <SelectPosition
                                    current={settings.price_position}
                                    name='price_position'
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.bodyRow}>
                        <div className={css.column}>
                            <div
                                className={classNames({
                                    [css.row]: true,
                                    [css.rowDisabled]: settings.border_color === 'none',
                                })
                            }>
                                <span className={css.label}>
                                    Ширина рамки
                                </span>
                                <Input
                                    value={this.state.settings.border_width}
                                    name='border_width'
                                    type='text'
                                    id='border_width'
                                    placeholder=''
                                    onChange={(e) => this.handleChangeInput(e.target.name, e.target.value, 'number')}
                                    onBlur={(e) => this.handleChangeInput(e.target.name, e.target.value, 'number', 'blur')}
                                />
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Рамка</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'purple'}
                                            value='purple'
                                            name='border_color'
                                            color='#4854a2'
                                            color2='#772088'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'orange'}
                                            value='orange'
                                            name='border_color'
                                            color='#ff4335'
                                            color2='#ff8c00'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'helloween'}
                                            value='helloween'
                                            name='border_color'
                                            color='#6A1B89'
                                            color2='#FFAA00'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'rednewyear'}
                                            value='rednewyear'
                                            name='border_color'
                                            color='#370006'
                                            color2='#9c0010'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'bluenewyear'}
                                            value='bluenewyear'
                                            name='border_color'
                                            color='#0F1D42'
                                            color2='#587ECD'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'spring'}
                                            value='spring'
                                            name='border_color'
                                            color='#e14fad'
                                            color2='#f9d423'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'healthweek'}
                                            value='healthweek'
                                            name='border_color'
                                            color='#4CB748'
                                            color2='#25DFE2'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={settings.border_color === 'sales'}
                                            value='sales'
                                            name='border_color'
                                            color='#82BAF7'
                                            color2='#F578DC'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <Checkbox
                                            checked={settings.border_color === 'none'}
                                            value='none'
                                            name='border_color'
                                            text='нет'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={classNames({
                            [css.bodyRow]: true,
                            [css.bodyRowDisabled]: settings.google_button || settings.apple_button,
                        })
                    }>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Текст кнопки</span>
                                <Input
                                    value={this.state.settings.button_text}
                                    name='button_text'
                                    type='text'
                                    id='button_text'
                                    placeholder='За покупками'
                                    onChange={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text')}
                                    onBlur={(e) => this.handleChangeInput(e.target.name, e.target.value, 'text', 'blur')}
                                />
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Цвет кнопки</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'orange'}
                                            value='orange'
                                            name='button_bg'
                                            color='#f67c0d'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'purple'}
                                            value='purple'
                                            name='button_bg'
                                            color='#8646aa'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'blue'}
                                            value='blue'
                                            name='button_bg'
                                            color='#51499d'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'grey'}
                                            value='grey'
                                            name='button_bg'
                                            color='#eaeef9'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'yellow'}
                                            value='yellow'
                                            name='button_bg'
                                            color='#f5c002'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={!settings.google_button && !settings.apple_button && settings.button_bg === 'white'}
                                            value='white'
                                            name='button_bg'
                                            color='#fff'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <Checkbox
                                            checked={!settings.google_button && !settings.apple_button && settings.button_contour}
                                            name='button_contour'
                                            text='контурная'
                                            onChange={this.handleChangeCheckbox}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={css.bodyRow}>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>Кнопки приложений</span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <Checkbox
                                            checked={settings.google_button}
                                            name='google_button'
                                            text='GooglePlay'
                                            onChange={this.handleChangeCheckbox}
                                        />
                                    </li>
                                    <li className={css.selectItem}>
                                        <Checkbox
                                            checked={settings.apple_button}
                                            name='apple_button'
                                            text='AppStore'
                                            onChange={this.handleChangeCheckbox}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className={classNames({
                                [css.column]: true,
                                [css.columnDisabled]: !settings.google_button && !settings.apple_button,
                            })
                        }>
                            <div className={css.row}>
                                <span className={css.label}>Цвет кнопок приложений</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={(settings.google_button || settings.apple_button) && settings.buttons_app_bg === 'white'}
                                            value='white'
                                            name='buttons_app_bg'
                                            color='#fff'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <ColorRadio
                                            checked={(settings.google_button || settings.apple_button) && settings.buttons_app_bg === 'black'}
                                            value='black'
                                            name='buttons_app_bg'
                                            color='#000'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className={css.row}>
                                <span className={css.label}>Язык кнопок приложений</span>
                                <ul className={css.colorList}>
                                    <li className={css.colorItem}>
                                        <RadioButton
                                            checked={settings.buttons_app_lang === 'ru'}
                                            value='ru'
                                            name='buttons_app_lang'
                                            text='ru'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                    <li className={css.colorItem}>
                                        <RadioButton
                                            checked={settings.buttons_app_lang === 'en'}
                                            value='en'
                                            name='buttons_app_lang'
                                            text='en'
                                            onChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={classNames({
                            [css.bodyRow]: true,
                            [css.bodyRowDisabled]: this.props.items.length < 2,
                        }
                    )}>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Время задержки кадра
                                    <Hint>
                                        Время показа каждого изображения баннера.<br/>
                                        1 секунда = 1000
                                    </Hint>
                                </span>
                                <Input
                                    value={this.state.settings.animation_delay}
                                    name='animation_delay'
                                    type='text'
                                    id='animation_delay'
                                    placeholder=''
                                    onChange={(e) => this.handleChangeInput(e.target.name, e.target.value, 'number')}
                                    onBlur={(e) => this.handleChangeInput(e.target.name, e.target.value, 'number', 'blur')}
                                />
                            </div>
                        </div>
                        <div className={css.column}>
                            <div className={css.row}>
                                <span className={css.label}>
                                    Анимация
                                    <Hint>Если отключить цикличную анимацию, баннер остановиться на первом кадре</Hint>
                                </span>
                                <ul className={css.selectList}>
                                    <li className={css.selectItem}>
                                        <Checkbox
                                            checked={settings.cycle_animation}
                                            name='cycle_animation'
                                            text='Цикличная анимация'
                                            onChange={this.handleChangeCheckbox}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
