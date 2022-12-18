import useMe from '../../hooks/useMe'

const Settings = () => {
  const me = useMe()
  if (!me) return null

  return (
    <section>
      <h1>Settings</h1>
      <p>{me.fullName}</p>
      <p>{me.email}</p>
    </section>
  )
}

export default Settings
