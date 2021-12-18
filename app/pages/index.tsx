import Layout from "app/core/layouts/Layout"
import { BlitzPage, useQuery } from "blitz"
import styled from "@emotion/styled"
import { Nav } from "app/ui/nav"
import { Footer } from "app/ui/footer"
import getFeaturedProjects from "app/projects/queries/getFeaturedProjects"
import { Suspense } from "react"
import { ProjectPreview } from "app/projects/components/ProjectPreview"

const Home: BlitzPage = () => {
  return (
    <PageLayout>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
      <Footer />
    </PageLayout>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

const PageLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const Main = () => {
  const [{ projects }] = useQuery(getFeaturedProjects, {})

  return (
    <main className="h-full bg-blue-500">
      <ProjectsList className="p-10 max-w-7xl m-auto">
        {projects.map((project) => (
          <ProjectPreview
            key={project.id}
            project={project}
            description={project.description}
            name={project.name}
          />
        ))}
      </ProjectsList>
    </main>
  )
}

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`
