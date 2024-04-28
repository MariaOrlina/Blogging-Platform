import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import RFU from './rfu'; // Ensure RFU is imported correctly

function Header(props) {
    const { sections, title } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Button
                    color="inherit"
                    onClick={handleOpen}
                    sx={{ position: 'absolute', right: 0, top: 0 }}
                >
                    Recommended For You
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Button
                        key={section.title}
                        component={RouterLink}
                        to={section.url}
                        sx={{ color: 'inherit', display: 'block', textTransform: 'none' }}
                    >
                        {section.title}
                    </Button>
                ))}
            </Toolbar>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <RFU />
            </Dialog>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
