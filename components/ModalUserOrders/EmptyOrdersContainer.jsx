import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

export default function EmptyOrdersContainer() {

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        width: "100%",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: "50%",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: 60,
            color: "#9e9e9e",
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="h2"
        align="center"
        sx={{
          color: "#616161",
          fontWeight: "medium",
        }}
      >
        Aún no has hecho ninguna compra
      </Typography>
    </Paper>
  )
}