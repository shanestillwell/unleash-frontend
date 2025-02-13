import { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Container, IconButton, Tooltip } from '@material-ui/core';
import { DrawerMenu } from '../drawer';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import UserProfile from '../../user/UserProfile';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { ReactComponent as UnleashLogo } from '../../../assets/img/logo-dark-with-text.svg';

import { useStyles } from './Header.styles';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useCommonStyles } from '../../../common.styles';
import { ADMIN } from '../../AccessProvider/permissions';
import useUser from '../../../hooks/api/getters/useUser/useUser';
import { IPermission } from '../../../interfaces/user';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import { getRoutes } from '../routes';
import { KeyboardArrowDown } from '@material-ui/icons';
import { filterByFlags } from '../../common/util';

const Header = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState();
    const [anchorElAdvanced, setAnchorElAdvanced] = useState();
    const [admin, setAdmin] = useState(false);
    const { permissions } = useUser();
    const commonStyles = useCommonStyles();
    const { uiConfig } = useUiConfig();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => setOpenDrawer(prev => !prev);
    const handleClose = () => setAnchorEl(null);
    const handleCloseAdvanced = () => setAnchorElAdvanced(null);

    useEffect(() => {
        const admin = permissions.find(
            (element: IPermission) => element.permission === ADMIN
        );

        if (admin) {
            setAdmin(true);
        }
    }, [permissions]);

    const { links, name, flags } = uiConfig;
    const routes = getRoutes();

    const filteredMainRoutes = {
        mainNavRoutes: routes.mainNavRoutes.filter(filterByFlags(flags)),
        adminRoutes: routes.adminRoutes,
    };

    return (
        <>
            <AppBar className={styles.header} position="static">
                <Container className={styles.container}>
                    <ConditionallyRender
                        condition={smallScreen}
                        show={
                            <IconButton
                                className={styles.drawerButton}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                        }
                        elseShow={
                            <Link to="/" className={commonStyles.flexRow}>
                                <UnleashLogo className={styles.logo} />{' '}
                            </Link>
                        }
                    />

                    <DrawerMenu
                        title={name}
                        flags={flags}
                        links={links}
                        open={openDrawer}
                        toggleDrawer={toggleDrawer}
                        admin={admin}
                        routes={filteredMainRoutes}
                    />
                    <ConditionallyRender
                        condition={!smallScreen}
                        show={
                            <div className={styles.links}>
                                <ConditionallyRender
                                    condition={flags?.P}
                                    show={<Link to="/projects">Projects</Link>}
                                />

                                <button
                                    className={styles.advancedNavButton}
                                    onClick={e =>
                                        setAnchorElAdvanced(e.currentTarget)
                                    }
                                    onMouseEnter={e =>
                                        setAnchorElAdvanced(e.currentTarget)
                                    }
                                >
                                    Navigate
                                    <KeyboardArrowDown />
                                </button>
                                <NavigationMenu
                                    id="settings-navigation"
                                    options={filteredMainRoutes.mainNavRoutes}
                                    anchorEl={anchorElAdvanced}
                                    handleClose={handleCloseAdvanced}
                                />
                            </div>
                        }
                    />
                    <div className={styles.userContainer}>
                        <ConditionallyRender
                            condition={!smallScreen}
                            show={
                                <>
                                    <Tooltip title="Go to the documentation">
                                        <a
                                            href="https://docs.getunleash.io/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.docsLink}
                                        >
                                            <MenuBookIcon
                                                className={styles.docsIcon}
                                            />
                                        </a>
                                    </Tooltip>
                                    <ConditionallyRender
                                        condition={admin}
                                        show={
                                            <IconButton
                                                onClick={e =>
                                                    setAnchorEl(e.currentTarget)
                                                }
                                                onMouseEnter={e =>
                                                    setAnchorEl(e.currentTarget)
                                                }
                                            >
                                                <SettingsIcon
                                                    className={styles.docsIcon}
                                                />
                                            </IconButton>
                                        }
                                    />

                                    <NavigationMenu
                                        id="admin-navigation"
                                        options={routes.adminRoutes}
                                        anchorEl={anchorEl}
                                        handleClose={handleClose}
                                    />
                                </>
                            }
                        />

                        <UserProfile />
                    </div>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
