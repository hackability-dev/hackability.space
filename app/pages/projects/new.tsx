import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { ProjectFormSchema } from "app/projects/validations"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        submitText="Create Project"
        schema={ProjectFormSchema}
        initialValues={{}}
        onSubmit={async (values) => {
          // try {
          //   const project = await createProjectMutation(values)
          //   router.push(Routes.ShowProjectPage({ projectId: project.id }))
          // } catch (error: any) {
          //   console.error(error)
          //   return {
          //     [FORM_ERROR]: error.toString(),
          //   }
          // }
          window.alert(values)
        }}
      />

      <p>
        <Link href={Routes.ProjectsPage()}>
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
