import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './FeatureToggleListNew.styles';
import FeatureToggleListNewItem from './FeatureToggleListNewItem/FeatureToggleListNewItem';
import usePagination from '../../../hooks/usePagination';

import loadingFeatures from './FeatureToggleListNewItem/loadingFeatures';
import { IFeatureToggleListItem } from '../../../interfaces/featureToggle';
import PaginateUI from '../../common/PaginateUI/PaginateUI';
interface IFeatureToggleListNewProps {
    features: IFeatureToggleListItem[];
    loading: boolean;
    projectId: string;
}

const FeatureToggleListNew = ({
    features,
    loading,
    projectId,
}: IFeatureToggleListNewProps) => {
    const styles = useStyles();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(features, 9);

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
            return loadingFeatures.map((feature: IFeatureToggleListItem) => {
                return (
                    <FeatureToggleListNewItem
                        key={feature.name}
                        name={feature.name}
                        type={feature.type}
                        environments={feature.environments}
                        projectId={projectId}
                    />
                );
            });
        }

        return page.map((feature: IFeatureToggleListItem) => {
            return (
                <FeatureToggleListNewItem
                    key={feature.name}
                    name={feature.name}
                    type={feature.type}
                    environments={feature.environments}
                    projectId={projectId}
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
                                styles.tableCellHeader,
                                styles.typeHeader
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
                                    <span data-loading>
                                        {env.name === ':global:'
                                            ? 'global'
                                            : env.name}
                                    </span>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>{renderFeatures()}</TableBody>
            </Table>
            <PaginateUI
                pages={pages}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </>
    );
};

export default FeatureToggleListNew;
