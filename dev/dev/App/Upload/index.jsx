import React from 'react';
import Dropzone from 'react-dropzone';

import classNames  from 'classnames';
import update from 'immutability-helper';
import FileReader from 'filereader';

import SortItem from './SortItem'
import Input from '../UI/Input';

import { SIZE_METRIC } from '../helpers';

// styles
import css from './Upload.sss'


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            items: this.props.items,
        };
    }

    handleImageDrop = (files) => {
        this.setState({loading: true});
        for (var i = 0; i < files.length; i++) {
            this.handleImageUpload(files[i]);
        };
    }

    handleDropRejected = (files) => {
        this.props.onNotify('Ошибка загрузки, проверьте правильность формата файлов', 'error');
        this.setState({loading: false});
        return null;
    }

    handleSortItems = (items) => {
        this.props.onUpload(items);
    }

    handleItemInputChange = (value, id, property, action='change') => {
        let uploadedItems = this.state.items;
        let itemIndex = uploadedItems.findIndex(function(c) {
            return c.id == id;
        });
        let updatedValue = update(uploadedItems[itemIndex], {[property]: {$set: value}});
        let newData = update(uploadedItems, {
            $splice: [[itemIndex, 1, updatedValue]]
        });
        if (action === 'change') {
            this.setState({
                items: newData,
            })
        } else if (action === 'blur') {
            this.props.onUpload(newData);
        }
    }

    handleDeleteItem = (id) => {
        let uploadedItems = this.props.items;
        let itemIndex = uploadedItems.findIndex(function(c) {
            return c.id == id;
        });
        let newData =  update(uploadedItems, {$splice: [[itemIndex, 1]]});
        this.props.onUpload(newData);
        this.setState({
            items: newData,
        })
    }


    handleImageUpload = (file) => {
        let uploadedItems = this.props.items;

        for (var i = 0; i < uploadedItems.length; i++) {
            if (file.name === uploadedItems[i].name) {
                var message = 'Файл ' + file.name + ' уже загружен'
                this.props.onNotify(message, 'warning');
                this.setState({loading: false});
                return null;
            }
        };

        function getFile(file, callback) {
            let reader = new window.FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = callback;
        };

        let uploatItem = getFile(file, (e) => {
            let fileSrc = e.target.result;
            let sizeInt = parseInt(Math.floor(Math.log(file.size) / Math.log(1024)));
            let fileSize = Math.round(file.size / Math.pow(1024, sizeInt), 2) + ' ' + SIZE_METRIC[sizeInt];
            uploadedItems.push({
                id: file.name + file.size,
                name: file.name,
                size: fileSize,
                src: fileSrc,
                title: '',
                text: '',
                price: '',
            });
            this.props.onUpload(uploadedItems);
            this.setState({
                items: uploadedItems,
                loading: false
            });
        });
    }


    render() {

        let items = this.state.items;
        let dropzoneClasses = classNames(
            css.dropzone,
            {
                [css.dropzoneLoading]: this.state.loading,
            },
        )

        return (
            <div>
                <Dropzone
                    className={dropzoneClasses}
                    activeClassName={css.activeDropzone}
                    onDrop={this.handleImageDrop}
                    onDropRejected={this.handleDropRejected}
                    multiple={true}
                    accept=".png, .gif, .jpg, .svg"
                >
                    <div className={css.dzDefault}>
                        <span className={css.dzDefaultIcon}></span>
                        <div className={css.dzDefaultText}>
                            Выберите <b>.png</b> файлы, и перетащите их сюда
                        </div>
                        <div className={css.dzDefaultControl}>
                            <div className={css.dzDefaultButton}>
                                <span className={css.dzDefaultButtonText}>Выбрать файлы</span>
                            </div>
                            <span className={css.dzDefaultControlText}>Или загрузите, воспользовавшись кнопкой</span>
                        </div>
                    </div>
                    <div className={css.dzHover}>
                        <span className={css.dzHoverIcon}></span>
                        <div className={css.dzHoverText}>
                            Отпустите файлы, чтобы загрузить изображения
                        </div>
                    </div>
                </Dropzone>


                {items.length === 0 ? null :
                    <div className={css.list}>
                        <div className={css.sortHeader}>
                            <div className={css.sortMoveCell} />
                            <div className={css.sortImageCell}>Изображение</div>
                            <div className={css.sortInfoCell}>Информация</div>
                            <div className={css.sortDeleteCell} />
                        </div>
                        <ul className={css.sortBody}>
                            {items.map((item, i) =>
                                <li key={item.id} className={css.sortItem}>
                                    {items.length > 1 ? (
                                        <SortItem
                                            onSortItems={this.handleSortItems}
                                            sortId={i}
                                            className={css.sortMoveCell}
                                            items={items}
                                        >
                                            <span className={css.sortMove} >
                                                <span className={css.sortMoveArrow} />
                                            </span>
                                        </SortItem>
                                    ) : (
                                        <span className={css.sortMoveCell} />
                                    )}
                                    <div className={css.sortImageCell}>
                                        <span className={css.sortImageHolder}>
                                            <img src={item.src} className={css.sortImage} alt={item.name} />
                                        </span>
                                        <span className={css.sortImageName}>{item.name}</span>
                                        <span className={css.sortImageSize}>{item.size}</span>
                                    </div>
                                    <div className={css.sortInfoCell}>
                                        <div className={css.sortInfoLine}>
                                            <Input
                                                value={item.title}
                                                name='title'
                                                placeholder='Заголовок'
                                                type='text'
                                                id={'title'+item.id}
                                                onChange={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name) }
                                                onBlur={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name, 'blur') }
                                            />
                                        </div>
                                        <div className={css.sortInfoLine}>
                                            <Input
                                                value={item.text}
                                                name='text'
                                                placeholder='Текст'
                                                type='text'
                                                id={'text'+item.id}
                                                onChange={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name) }
                                                onBlur={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name, 'blur') }
                                            />
                                        </div>
                                        <div className={css.sortInfoLine}>
                                            <Input
                                                value={item.price}
                                                name='price'
                                                placeholder='Цена'
                                                type='text'
                                                id={'price'+item.id}
                                                onChange={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name) }
                                                onBlur={ (e) => this.handleItemInputChange(e.target.value, item.id, e.target.name, 'blur') }
                                            />
                                        </div>
                                    </div>
                                    <div className={css.sortDeleteCell}>
                                        <span
                                            className={css.sortDelete}
                                            onClick={ (e) => this.handleDeleteItem(item.id) }
                                        />
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>                
                }

            </div>
        )
    }
}