import React, { useState, useEffect } from 'react';
import './index.css';
import Gallery, { DisplayMode } from '../Gallery';
import Search, { SearchParameter } from '../Search';
import axios from 'axios';
import serverConfig from '../../config/server.json'
import { ProgressIndicator, DefaultButton, TextField, Icon } from 'office-ui-fabric-react';
import queryString from 'query-string';
import { RouteChildrenProps } from 'react-router';

export enum GalleryType {
    Gallery,
    Tag,
    Uplaoder
}

interface IHomeProps extends RouteChildrenProps<any> {
    type: GalleryType
}

export default function Home(props: IHomeProps) {
    const [galleryList, setGalleryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [enabledCat, setEnabledCat] = useState([])
    const [hasPrev, setHasPrev] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isError, setIsError] = useState(false);
    const fetchData = async (query?: any) => {
        setIsError(false);
        setIsLoading(true);
        let params: any = {};
        if (query) {
            params = query;
        } else {
            params = queryString.parse(props.location.search);
        }
        if (params.search) {
            setQuery(params.search as string)
        }
        setEnabledCat(params.cat || [])
        try {
            let baseUrl = serverConfig.baseurl;
            switch (props.type) {
                case GalleryType.Tag:
                    baseUrl += '/tag'
                    break;
                case GalleryType.Uplaoder:
                    baseUrl += '/uploader'
                    break;
                default:
                    break;
            }
            const response = await axios.get(baseUrl, {
                params: params,
                paramsSerializer: p => {
                    return queryString.stringify(p)
                }
            });
            setTotalPage(parseInt(response.data.totalPage));
            setCurrentPage(parseInt(response.data.currentPage));
            setTotalCount(parseInt(response.data.totalCount));
            setHasPrev(response.data.currentPage > 0);
            setGalleryList(response.data.items);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [props]);

    function doSearch(search: SearchParameter) {
        props.history.push({
            search: `?${queryString.stringify(search)}`
        });
        // fetchData(search);
    }

    function toNext() {
        toPage(currentPage + 1)
    }

    function toPrev() {
        if (hasPrev) {
            toPage(currentPage - 1)
        }
    }

    function toPage(page: number) {
        const params = Object.assign(queryString.parse(props.location.search), {
            page
        })
        props.history.push({
            search: `?${queryString.stringify(params)}`
        });
        fetchData(params);
    }

    return (
        <div className="App">
            <div className="search-content">
                <Search cats={enabledCat} onChange={(it: any) => setQuery(it.target.value)} query={query} onSearch={(search) => doSearch(search)} />
            </div>
            {!isLoading && !isError &&
                <div>

                    <div className="paging-container">
                        {hasPrev && <DefaultButton text="<" onClick={toPrev} />}
                        <TextField max={totalPage} type="number" value={currentPage.toString()} onChange={(it: any) => setCurrentPage(parseInt(it.target.value))} className="paging-input" />
                        <DefaultButton text="GO!" onClick={() => toPage(currentPage)} />
                        <DefaultButton text=">" onClick={toNext} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        Getting {totalPage} pages, {totalCount} items
                    </div>
                </div>
            }
            {isError &&
                <div style={{
                    margin: '2em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Icon style={{ fontSize: '6em' }} iconName="Sad" />
                    <div style={{ fontSize: '2em' }}>Loading error</div>
                </div>
            }
            <div className="gallery-content">
                {isLoading && <ProgressIndicator />}
                {!isLoading && <Gallery displayMode={DisplayMode.ExtendedList} items={galleryList} />}
            </div>
            {!isLoading && !isError &&
                <div className="paging-container">
                    {hasPrev && <DefaultButton text="<" onClick={toPrev} />}
                    <TextField max={totalPage} type="number" value={currentPage.toString()} onChange={(it: any) => setCurrentPage(parseInt(it.target.value))} className="paging-input" />
                    <DefaultButton text="GO!" onClick={() => toPage(currentPage)} />
                    <DefaultButton text=">" onClick={toNext} />
                </div>
            }
        </div>
    );
}

