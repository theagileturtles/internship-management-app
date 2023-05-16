import { Box, Center, FileInput, Group } from "@mantine/core";
import { File, Pencil } from "tabler-icons-react";

function Value({ file, defaultName, alreadyUploaded }) {

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={(theme) => ({
          color: theme.colors.text,
          fontSize: theme.fontSizes.xs,
          borderRadius: theme.radius.sm,
          alignItems: "center",
          display: "flex",
          width: "100%",
        })}
      >
        {typeof file === "undefined"
          ? alreadyUploaded
            ? defaultName
            : ""
          : file.name}
      </Box>
      {typeof file !== "undefined" ? (
        <Pencil
          style={{ alignSelf: "center", justifySelf: "center" }}
          color="gray"
          size={"1.3rem"}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

const ValueComponent = ({ value, defaultName, alreadyUploaded = false }) => {
  return (
    <Value
      file={value.value}
      alreadyUploaded={alreadyUploaded}
      defaultName={defaultName}
    />
  );
};

export default function UploadInput(props) {
  return (
    <FileInput
      {...props}
      valueComponent={(value) => <ValueComponent
          value={value}
          alreadyUploaded={props.alreadyuploaded}
          defaultName={props.defaultname}
        />
      }
    />
  );
}
