import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import { Project } from "@prisma/client"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ProjectList projects={projects} />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProjectPage()}>
            <a>Create Project</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = true
ProjectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProjectsPage

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus
            atque, ducimus sed.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {projects.map((project) => (
            <div key={project.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={
                    "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F0XUTQSgCkQptIfaOI54P%2Fimages%2FByjHCSG5aG3jUjHxOMvW%2FIMG_7438-min@medium.jpg?generation=1563725929822580&alt=media"
                  }
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">
                      Category
                    </a>
                  </p>
                  <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
                    <a className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{project.name}</p>
                      <p className="mt-3 text-base text-gray-500">{project.description}</p>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  {/* <div className="flex-shrink-0">
                    <a href={project.author.href}>
                      <span className="sr-only">{project.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={project.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div> */}
                  <div className="ml-3">
                    {/* <p className="text-sm font-medium text-gray-900">
                      <a href={project.author.href} className="hover:underline">
                        {project.author.name}
                      </a>
                    </p> */}
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={project.createdAt.toDateString()}>
                        {project.createdAt.toDateString()}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>10 read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
