import { useState } from "react";

import { Button, Collapse, Flex, SimpleGrid, Title, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";

import { useGetClassroomResourcesQuery } from "@/shared/redux/rtk-apis/classworks/classworks.api";

import ResourceCard from "../ResourceCard/ResourceCard";
import { IResourcesProps } from "./Resources.interface";
import { useStyles } from "./Resources.styles";

const Resources: React.FC<IResourcesProps> = ({ classroomId }) => {
  const { classes } = useStyles();
  const [toggleMaterialsCollapse, setToggleMaterialsCollapse] = useState(true);

  const {
    data: uploadedMaterials,
    isLoading,
    error,
  } = useGetClassroomResourcesQuery(classroomId, {
    skip: !classroomId,
  });

  if (error) {
    showNotification({
      title: "Error",
      message: "Failed to load materials.",
      color: "red",
    });
  }

  return (
    <>
      <Flex>
        <Button
          variant="subtle"
          size="compact"
          leftIcon={
            toggleMaterialsCollapse ? (
              <FaChevronDown color="white" />
            ) : (
              <FaChevronRight color="white" />
            )
          }
          className={classes.titleButton}
          onClick={() => setToggleMaterialsCollapse(!toggleMaterialsCollapse)}
        >
          <Title my={"md"} order={3} className={classes.collapseTitle}>
            Materials
          </Title>
        </Button>
      </Flex>

      <Collapse in={toggleMaterialsCollapse} transitionDuration={0} animateOpacity={false}>
        {isLoading ? (
          <Loader size="sm" />
        ) : uploadedMaterials && uploadedMaterials.length !== 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {uploadedMaterials.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Title order={4} className={classes.noMaterialsTitle}>
            No Materials available
          </Title>
        )}
      </Collapse>
    </>
  );
};

export default Resources;
