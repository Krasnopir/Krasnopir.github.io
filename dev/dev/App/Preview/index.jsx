import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { markupFunction } from '../helpers';

import RadioButton from '../UI/RadioButton';

// styles
import css from './Preview.sss';


const VIEW_SIZES = [
    [ '200x200', '250x250', '300x250', '300x300', '336x280' ],
    [ '468x60', '728x90', '970x90', '970x250', '1000x120' ],
    [ '240x400', '240x600', '300x500', '300x600', '480x960' ],
    [ '120x600', '160x600' ],
    [ '960x480', '1200x628', '1080x1080' ],
];


export default class Preview extends React.Component {
    constructor() {
        super();
        this.state = {
            showSizes: true,
        };
    }


    handleShowSizes = () => {
        this.setState({
            showSizes: !this.state.showSizes,
        });
    };

    render() {

        const viewItems = this.props.items

        const iframeSrcDoc = markupFunction(viewItems, this.props.settings, this.props.view);
        const htmlContent = markupFunction(viewItems, this.props.settings, this.props.view, true);

        return (
            <div className={css.root}>
                <Tabs className={css.tabs}>
                    <TabList className={css.list}>
                        <Tab className={css.item} selectedClassName={css.activeItem}>
                            Предпросмотр
                        </Tab>
                        <Tab className={css.item} selectedClassName={css.activeItem}>
                            HTML код
                        </Tab>
                    </TabList>
                    
                    <TabPanel>
                        <div className={css.content}>
                            {this.props.items.length > 0 &&
                                <div>
                                    <div className={css.contentWrapper}>

                                        <span
                                            className={css.sizeLink}
                                            onClick={this.handleShowSizes}
                                        >
                                            {this.state.showSizes ? 'Скрыть размеры баннера' : 'Показать размеры баннера'}
                                        </span>
                                        {this.state.showSizes &&
                                            <div className={css.sizeWrapper}>
                                                <div className={css.sizeList}>
                                                    {VIEW_SIZES.map((column, key) => (
                                                        <ul
                                                            className={css.sizeColumn}
                                                            key={key}
                                                        >
                                                            {column.map((size, index) => (
                                                                <li
                                                                    className={css.sizeItem}
                                                                    key={index}
                                                                >
                                                                    <RadioButton
                                                                        checked={this.props.view.includes(size)}
                                                                        value={size}
                                                                        name='frame_size'
                                                                        text={size}
                                                                        onChange={this.props.onChangeSize}
                                                                    />
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className={css.previewWrapper}>
                                        <ul className={css.previewList}>
                                            {this.props.view.map((size, key) => {
                                                const previewsStyles = {
                                                    width: size.split('x')[0] + 'px',
                                                    height: size.split('x')[1] + 'px',
                                                };
                                                return (
                                                    <li
                                                        className={css.previeItem}
                                                        key={key}
                                                    >
                                                        <div
                                                            className={css.previewHolder}
                                                            style={previewsStyles}
                                                            id={`previewFrame-${size}`}
                                                        >
                                                            <iframe
                                                                className={css.previewFrame}
                                                                srcDoc={iframeSrcDoc}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={css.content}>
                            {this.props.items.length > 0 &&
                                <div className={css.htmlWrapper}>
                                    <pre className={css.htmlContent}>
                                        {htmlContent}
                                    </pre>
                                </div>
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
