import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'

const cwd = process.cwd()
const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}
const defaultTargetDir = 'obelisk-cocos-template-project'

const init = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Input your projectName.',
      initial: defaultTargetDir
    },
    {
      type: 'select',
      name: 'platform',
      message: 'Pick your platform.',
      choices: [
        { title: '101', description: 'Quick start', value: 'web' },
        { title: 'Web', description: 'Web', value: 'h5' },
        { title: 'Cocos', description: 'Cocos Creator', value: 'h5game' }
      ],
      initial: 0
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Pick your framework.',
      choices: (platform) => {
        if (platform === 'web') {
          return [
            { title: 'Nextjs', value: 'nextjs' },
          ]
        }
        else if (platform === 'h5') {
          return [
            { title: 'Nextjs', value: 'nextjs' }
          ]
        }
        else if (platform === 'h5game') {
          return [
            { title: 'Typescript', value: 'ts' },
          ]
        }
        return null
      },
      initial: 0
    },
  ]);
  const { projectName, platform, framework } = response
  let tool = ''
  let target = ''
  if (platform === 'web') {
    tool = '101'
  }
  else if (platform === 'h5') {
    tool = 'nextjs'
  }
  else {
    tool = 'cocos'
  }

  if (framework === 'nextjs') {
    target = `obelisk-${tool}-template`
  }
  else if (framework === '101') {
    target = `obelisk-${tool}-template`
  }
  else {
    target = `obelisk-${tool}-template`
  }
  let targetDir = projectName || defaultTargetDir
  const root = path.join(cwd, targetDir)

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    target,
  )

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
  )

  pkg.name = projectName

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  const cdProjectName = path.relative(cwd, root)
  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`,
    )
  }
  if (tool == '101'){
    console.log(`  ${pkgManager} install`)
    console.log(`  ${pkgManager} run dev`)
  }
  else if (tool == 'nextjs'){
    console.log(`  ${pkgManager} install`)
    console.log(`  ${pkgManager} run dev`)
  }
  else if (tool == 'cocos') {
    console.log(`  import project by cocos create ide `)
    console.log(`  ${pkgManager} install`)
    console.log(`  ${pkgManager} run dev`)
    console.log(`  start you cocos project `)
  }
  // switch (pkgManager) {
  //   case 'yarn':
  //     console.log('  yarn')
  //     console.log('  yarn dev')
  //     break
  //   default:
  //     console.log(`  ${pkgManager} install`)
  //     console.log(`  ${pkgManager} run dev`)
  //     break
  // }
  console.log()
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

init().catch((e) => {
  console.error(e)
})
