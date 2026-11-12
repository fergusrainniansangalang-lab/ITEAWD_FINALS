/* SitemapViewer.jsx — displays the sitemap structure */
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import sitemap from 'routes/sitemap';

export default function SitemapViewer() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AccountTreeIcon sx={{ color: '#EC407A' }} />
        <Typography variant="h6" fontWeight={700} color="#EC407A">Site Map</Typography>
      </Box>
      {sitemap.map((section) => (
        <Box key={section.id} sx={{ mb: 2 }}>
          <Chip label={section.subheader} sx={{ bgcolor: '#FCE4EC', color: '#EC407A', fontWeight: 700, mb: 1 }} />
          <List dense>
            {section.items.map((item) => (
              <ListItem key={item.key} sx={{ pl: 2 }}>
                <ListItemText
                  primary={<Typography variant="body2" fontWeight={600}>{item.name}</Typography>}
                  secondary={<Typography variant="caption" color="text.secondary">{item.path}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
