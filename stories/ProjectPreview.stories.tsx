import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { ProjectPreview } from "../app/projects/components/ProjectPreview"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Projects/Preview",
  component: ProjectPreview,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: "text" },
  },
} as ComponentMeta<typeof ProjectPreview>

const projectPreviewMock = {
  id: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "React Saturday Code",
  description: "lsakdfjslgdknsfdlnkg",
  tags: [],
  body: "storybook",
  images: [],
  license: "cc-ns-by-sa",
  draft: true,
  published: false,
  underRevision: false,
}

const Template: ComponentStory<typeof ProjectPreview> = (args) => (
  <ProjectPreview {...args} project={projectPreviewMock} />
)

export const Primary = Template.bind({})
Primary.args = {
  project: {
    name: "Nameee",
    description: "desc",
  },
}

export const Outline = Template.bind({})
Primary.args = {
  project: {
    name: "Nameee",
    description: "desc",
  },
}
