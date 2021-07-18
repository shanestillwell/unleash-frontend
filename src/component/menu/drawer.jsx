import React from 'react';
import { Divider, Drawer, List } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import styles from './drawer.module.scss';

import { ReactComponent as LogoIcon } from '../../assets/icons/logo_wbg.svg';
import NavigationLink from './Header/NavigationLink/NavigationLink';
import ConditionallyRender from '../common/ConditionallyRender';
import { getBasePath } from '../../utils/format-path';

function getIcon(IconComponent) {
    if (IconComponent === 'c_github') {
        return <GitHubIcon className={classnames(styles.navigationIcon)} />;
    } else if (IconComponent === 'library_books') {
        return <LibraryBooksIcon className={styles.navigationIcon} />;
    } else {
        return <IconComponent className={styles.navigationIcon} />;
    }
}

export const DrawerMenu = ({
    links = [],
    title = 'Unleash',
    flags = {},
    open = false,
    toggleDrawer,
    admin,
    routes,
}) => {
    const renderLinks = () => {
        return links.map(link => {
            let icon = null;
            if (link.value === 'GitHub') {
                icon = <GitHubIcon className={styles.navigationIcon} />;
            } else if (link.value === 'Documentation') {
                icon = <LibraryBooksIcon className={styles.navigationIcon} />;
            }

            return (
                <a
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={styles.iconLink}
                    key={link.value}
                >
                    {icon}
                    {link.value}
                </a>
            );
        });
    };

    return (
        <Drawer
            className={styles.drawer}
            open={open}
            anchor={'left'}
            onClose={() => toggleDrawer()}
        >
            <div className={styles.drawerContainer}>
                <div>
                    <span className={[styles.drawerTitle].join(' ')}>
                        <LogoIcon className={styles.drawerTitleLogo} />

                        <span className={styles.drawerTitleText}>{title}</span>
                    </span>
                </div>
                <Divider />
                <List className={styles.drawerList}>
                    {routes.mainNavRoutes.map(item => (
                        <NavigationLink
                            handleClose={() => toggleDrawer()}
                            path={item.path}
                            text={item.title}
                            key={item.path}
                        />
                    ))}
                </List>
                <ConditionallyRender
                    condition={admin}
                    show={
                        <>
                            <Divider />

                            <List className={styles.drawerList}>
                                {routes.adminRoutes.map(item => (
                                    <NavigationLink
                                        handleClose={() => toggleDrawer()}
                                        path={item.path}
                                        text={item.title}
                                        key={item.path}
                                    />
                                ))}
                            </List>
                        </>
                    }
                />
                <Divider />
                <div className={styles.iconLinkList}>
                    {renderLinks()}
                    <a className={classnames(styles.navigationLink)} href={`${getBasePath()}/logout`}>
                        {getIcon('exit_to_app')}
                        Sign out
                    </a>
                </div>
            </div>
        </Drawer>
    );
};

DrawerMenu.propTypes = {
    links: PropTypes.array,
    title: PropTypes.string,
    flags: PropTypes.object,
    open: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};
