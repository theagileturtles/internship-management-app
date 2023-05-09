import { Box, Center, FileInput, Group } from "@mantine/core";
import { File, Pencil } from "tabler-icons-react";

function Value({ file }) {
    return (
        <Box sx={{display:"flex"}}>
      <Box
        sx={(theme) => ({
          color:theme.colors.text,
          fontSize: theme.fontSizes.xs,
          borderRadius: theme.radius.sm,
          alignItems:"center",
          display:"flex",
          width:"100%"
        })}
      >
        {file.name}
      </Box>
      {typeof file !=="undefined" ? (<Pencil style={{alignSelf:"end", justifySelf:"end"}} color="gray" size={"1.3rem"} />):<></>}
      
      </Box>
      
    );
  }

  const ValueComponent = ({ value }) => {
    if (Array.isArray(value)) {
      return (
        <Group spacing="sm" py="xs">
          {value.map((file, index) => (
            <Value file={file} key={index} />
          ))}
        </Group>
      );
    }
  
    return <Value file={value} />;
  };

export default function UploadInput(props){
return(
    <FileInput {...props} valueComponent={ValueComponent} />
)
} 