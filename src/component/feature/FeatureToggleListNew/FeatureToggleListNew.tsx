import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import classnames from 'classnames';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useStyles } from './FeatureToggleListNew.styles';
import FeatureToggleListNewItem from './FeatureToggleListNewItem/FeatureToggleListNewItem';
import usePagination from '../../../hooks/usePagination';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import loadingFeatures from './FeatureToggleListNewItem/loadingFeatures';
interface IFeatureToggleListNewProps {
    features: any[];
    loading: boolean;
}

// const data = {
//     features: [
//         {
//             type: 'release',
//             name: 'hallo',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'hello-worldas',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'thisismytogg',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'hello-togga',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'hello-mr-togg',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'haitogg',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//         {
//             type: 'release',
//             name: 'da',
//             environments: [
//                 {
//                     name: 'dev',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: 'prod',
//                     displayName: 'development',
//                     enabled: false,
//                 },
//                 {
//                     name: ':global:',
//                     displayName: 'Across all environments',
//                     enabled: true,
//                 },
//             ],
//         },
//     ],
// };

const FeatureToggleListNew = ({
    features,
    loading,
}: IFeatureToggleListNewProps) => {
    const styles = useStyles();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(features, 9);
    // const { features } = data;

    const getEnvironments = () => {
        if (features.length > 0) {
            const envs = features[0].environments || [];
            return envs;
        }
        return [
            {
                name: ':global:',
                displayName: 'Across all environments',
                enabled: false,
            },
        ];
    };

    const renderFeatures = () => {
        if (loading) {
            return loadingFeatures.map((feature: any) => {
                return (
                    <FeatureToggleListNewItem
                        key={feature.name}
                        name={feature.name}
                        type={feature.type}
                        environments={feature.environments}
                    />
                );
            });
        }
        return page.map((feature: any) => {
            return (
                <FeatureToggleListNewItem
                    key={feature.name}
                    name={feature.name}
                    type={feature.type}
                    environments={feature.environments}
                />
            );
        });
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            className={classnames(
                                styles.tableCell,
                                styles.tableCellName,
                                styles.tableCellHeader
                            )}
                            align="left"
                        >
                            <span data-loading>name</span>
                        </TableCell>
                        <TableCell
                            className={classnames(
                                styles.tableCell,
                                styles.tableCellHeader
                            )}
                            align="left"
                        >
                            <span data-loading>type</span>
                        </TableCell>
                        {getEnvironments().map((env: any) => {
                            return (
                                <TableCell
                                    key={env.name}
                                    className={classnames(
                                        styles.tableCell,
                                        styles.tableCellEnv,
                                        styles.tableCellHeader
                                    )}
                                    align="center"
                                >
                                    <span data-loading>{env.name}</span>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ConditionallyRender
                        condition={features.length > 0}
                        show={renderFeatures()}
                    />
                </TableBody>
            </Table>
            <ConditionallyRender
                condition={pages.length > 1}
                show={
                    <div className={styles.pagination}>
                        <div className={styles.paginationInnerContainer}>
                            <ConditionallyRender
                                condition={pageIndex > 0}
                                show={
                                    <button
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnLeft
                                        )}
                                        onClick={() => prevPage()}
                                    >
                                        <ArrowBackIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                }
                            />
                            {pages.map((page, idx) => {
                                const active = pageIndex === idx;
                                return (
                                    <button
                                        key={idx}
                                        className={classnames(
                                            styles.paginationButton,
                                            {
                                                [styles.paginationButtonActive]:
                                                    active,
                                            }
                                        )}
                                        onClick={() => setPageIndex(idx)}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                            <ConditionallyRender
                                condition={pageIndex < pages.length - 1}
                                show={
                                    <button
                                        onClick={() => nextPage()}
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnRight
                                        )}
                                    >
                                        <ArrowForwardIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                }
                            />
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default FeatureToggleListNew;
