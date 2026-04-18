"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Workflow, 
  Users, 
  Layers, 
  Search, 
  Lightbulb, 
  Network, 
  Layout, 
  PenTool, 
  CheckSquare, 
  Package, 
  Code, 
  Smartphone,
  Globe, 
  Monitor, 
  TestTube, 
  Database, 
  Server, 
  Hexagon, 
  FileCode2,
  GitBranch, 
  GitCommit, 
  GitMerge, 
  FileText, 
  FileSpreadsheet,
  File, 
  LineChart, 
  TrendingUp, 
  Link, 
  Settings, 
  ShieldCheck,
  Brain, 
  Rocket, 
  Sliders, 
  Wrench, 
  FolderKanban
} from "lucide-react";
import { SkillExecutionPanel } from "@/components/skill-execution-panel";

const ICON_LIST = [

  // description 内容全部为中文
  { icon: Workflow, name: "Meta Dispatcher", color: "text-blue-400", description: "PRD 驱动的任务调度与技能管理专家。接收完整 PRD/需求文档，负责拆解业务、选择技术栈、路由到合适的专业 Skill，并维护从方案到落地的全流程。" },
  { icon: Users, name: "Universal Dev Team", color: "text-purple-400", description: "一个适合初学者的全能开发团队，包含产品经理、架构师、设计师、开发者和测试人员，指导你完成从想法到上线的全过程。" },
  { icon: Layers, name: "Tech Stack Selector", color: "text-cyan-400", description: "专门用于在项目初期或重大功能迭代时进行技术栈选择与方案评估。支持根据 PRD 自动生成 2-3 套对比方案，涵盖前端、后端、数据库及中间件，并提供优劣势分析（性能、SEO、开发成本、可维护性）和最终选型建议。" },
  { icon: Search, name: "GitHub Search", color: "text-slate-400", description: "专用于在 GitHub 上搜索现有的开源库、工具、MCP Server 或最佳实践代码。当你想在开始开发前查找是否有“现成的轮子”或参考案例时使用。" },
  { icon: Lightbulb, name: "Brainstorming", color: "text-yellow-400", description: "创意工作前必用，用于探索用户需求、功能和设计。" },
  { icon: Network, name: "API Design", color: "text-emerald-400", description: "设计 RESTful API 的专家，负责根据用户需求设计和实现 API。" },
  { icon: Layout, name: "Frontend Impl", color: "text-pink-400", description: "创建具有独特风格、生产级品质且设计精良的前端界面。当用户要求构建 Web 组件、页面、产品、海报或应用程序时（例如网站、落地页、仪表盘、React 组件、HTML/CSS 布局，或对任何 Web UI 进行样式美化），请运用此技能。生成富有创意、精雕细琢的代码和 UI 设计，避免落入通用 AI 美学的窠臼。" },
  { icon: PenTool, name: "UI/UX Intelligence", color: "text-rose-400", description: "UI/UX 设计智能库与推荐专家。包含 67 种风格、96 种配色方案、57 种字体搭配、99 条 UX 指南，支持跨技术栈的设计系统生成。" },
  { icon: CheckSquare, name: "Web Guidelines", color: "text-orange-400", description: "审核 UI 代码是否符合 Web 接口规范。当用户要求审核 UI、检查访问性、审核设计、审核 UX 或检查网站是否最佳实践时使用。" },
  { icon: Package, name: "Artifacts Builder", color: "text-indigo-400", description: "构建复杂、多组件的 Claude.ai HTML 资产的工具集。" },
  { icon: Code, name: "React Best Practices", color: "text-cyan-500", description: "React 优化最佳实践专家，负责根据 React/Next.js 项目的需求，优化代码性能和可维护性。" },
  { icon: Smartphone, name: "Flutter", color: "text-blue-500", description: "专注于构建高性能、可扩展且架构清晰的 Flutter 应用。涵盖整洁架构、高级状态管理和深度性能优化。" },
  { icon: Globe, name: "Flutter China Deploy", color: "text-red-400", description: "Flutter 项目中国环境部署加速专家。用于在 Flutter 项目初始化、部署和运行时配置国内镜像加速。当用户需要：(1) 初始化 Flutter 项目并配置中国镜像加速 (2) 解决 Flutter 依赖下载慢的问题 (3) 配置 Gradle/Maven 国内镜像 (4) 快速部署 Flutter 项目到手机/模拟器 时使用此 Skill。" },
  { icon: Monitor, name: "Browser Automation", color: "text-amber-400", description: "浏览器自动化与网页测试专家。支持基于 MCP 工具（Puppeteer/Playwright）的实时交互，以及基于 Python 脚本的复杂自动化流实现。" },
  { icon: TestTube, name: "Web App Testing", color: "text-lime-400", description: "基于 Playwright 的本地网页应用测试工具集。支持验证前端功能、调试 UI 行为、捕获浏览器截图和查看浏览器日志。" },
  { icon: Database, name: "Backend Database", color: "text-blue-600", description: "专注于数据库设计、SQL 优化和迁移策略。" },
  { icon: Server, name: "MCP Builder", color: "text-purple-500", description: "构建高质量的 MCP 服务器，使 LLM 能够与外部服务进行交互，支持 Python 和 Node.js。" },
  { icon: Hexagon, name: "Backend Node", color: "text-green-500", description: "专注于 Node.js 后端开发模式与最佳实践。" },
  { icon: FileCode2, name: "Backend Python", color: "text-yellow-500", description: "专注于 Python 后端开发，涵盖 FastAPI、异步编程和性能优化。" },
  { icon: GitBranch, name: "GitOps", color: "text-blue-300", description: "使用 ArgoCD 和 Flux 实现 GitOps 工作流，以进行自动化、声明式的 Kubernetes 部署并持续进行协调。适用于实施 GitOps 实践、自动化 Kubernetes 部署或设置声明式基础设施管理。" },
  { icon: GitCommit, name: "Git Workflow", color: "text-orange-500", description: "Git 版本控制与协作专家，涵盖 GitHub/Gitee 平台操作、Conventional Commits 规范及 PR/MR 最佳实践。" },
  { icon: GitMerge, name: "Gitee Workflow", color: "text-red-500", description: "深度集成 Gitee MCP，实现 Issue 管理、PR 自动化提交、代码审查和版本发布的全流程自动化。" },
  { icon: FileText, name: "Office Docx", color: "text-blue-500", description: "专业的 Word 文档创建、编辑和分析工具，支持跟踪更改、评论、格式化保留和文本提取。当用户需要处理 Word 文件（.docx）时，可用于：(1) 创建新的 Word 文档；(2) 修改或编辑内容；(3) 工作与跟踪更改；(4) 添加评论；(5) 其他文档任务。" },
  { icon: FileSpreadsheet, name: "Office Excel", color: "text-emerald-500", description: "专业的 Excel 文档创建、编辑和分析工具，支持公式、格式化、数据分析和可视化。当用户需要处理 Excel 文件（.xlsx、.xlsm、.csv、.tsv 等）时，可用于：(1) 创建新的 Excel 文档并添加公式和格式化；(2) 读取或分析数据；(3) 修改现有 Excel 文档而保留公式；(4) 在 Excel 中进行数据分析和可视化；(5) 重新计算公式。" },
  { icon: File, name: "Office Pdf", color: "text-red-400", description: "专业的 PDF 文档处理工具集，支持从 PDF 中提取文本和表格、创建新的 PDF 文档、合并/拆分文档和处理表单。当用户需要：(1) 从 PDF 中提取文本和表格；(2) 创建新的 PDF 文档；(3) 合并/拆分文档；(4) 处理表单。" },
  { icon: LineChart, name: "SEO Analytics", color: "text-blue-400", description: "SEO 数据分析专家，擅长 Google Search Console、Google Analytics 数据分析、排名追踪和 ROI 计算。适用于 SEO 效果评估、策略调整和数据驱动决策时使用。" },
  { icon: TrendingUp, name: "SEO Content", color: "text-green-400", description: "SEO 内容策略专家，擅长关键词研究、内容规划、长尾词布局和内容营销策略。适用于创建 SEO 友好的文章 landing page 和营销内容时使用。" },
  { icon: Link, name: "SEO Link Building", color: "text-purple-400", description: "链接建设与社交 SEO 专家，擅长外链获取策略、社交媒体优化和品牌建设。适用于提升网站权威度、获取高质量反向链接和社交信号增强时使用。" },
  { icon: Settings, name: "SEO Technical", color: "text-slate-400", description: "技术 SEO 专家，擅长网站性能优化、结构化数据、移动端优化和技术问题诊断。适用于网站技术实现、性能调优和问题排查时使用。" },
  { icon: ShieldCheck, name: "Security Specialist", color: "text-red-600", description: "应用安全专家，专注于认证授权、数据保护和合规性审计。当用户需要：(1) 设计安全的登录认证系统 (2) 进行安全代码审查 (3) 检查 GDPR/隐私合规 (4) 防范常见安全漏洞 (OWASP Top 10) 时使用此 Skill。" },
  { icon: Brain, name: "AI Engineer", color: "text-violet-500", description: "专注于 LLM 应用开发，涵盖 RAG 和 LangChain 架构。" },
  { icon: Rocket, name: "Operations Growth", color: "text-orange-400", description: "专注于内容创作（文案、运营稿件）、运营数据分析、以及营销活动策划与设置。帮助项目实现从“可用”到“好用”及“增长”的闭环。" },
  { icon: Sliders, name: "Meta Customization", color: "text-gray-400", description: "指导用户如何自定义 Trae Skills 的配置，包括覆盖角色设定、调整技术偏好和定义全局规则。" },
  { icon: Wrench, name: "Skill Creator", color: "text-zinc-400", description: "创建有效 Skill 的专家，负责根据用户需求和专业知识，设计和实现新的 Skill。" },
  { icon: FolderKanban, name: "Project Setup", color: "text-sky-400", description: "Trae 项目规范化配置专家。用于快速初始化 Trae 项目配置文件、生成项目规则、用户偏好设置和 Skill 模板。当用户需要：(1) 初始化新项目的 Trae 配置 (2) 生成 .trae 目录结构 (3) 创建 USER_PREFERENCES.md 用户偏好文件 (4) 创建 project_rules.md 项目规则文件 (5) 创建新的 Skill 模板 时使用此 Skill。" },


];

export function IconRing() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pulledIcons, setPulledIcons] = useState<{ left: number, right: number } | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const radius = 420; 
  const iconsCount = ICON_LIST.length;

  useEffect(() => {
    setMounted(true);
    let isActive = true;

    const cycle = async () => {
      while (isActive) {
        await new Promise(r => setTimeout(r, 2000));
        if (!isActive) break;

        let left = Math.floor(Math.random() * iconsCount);
        let right = Math.floor(Math.random() * iconsCount);
        while (right === left) {
          right = Math.floor(Math.random() * iconsCount);
        }
        setPulledIcons({ left, right });

        await new Promise(r => setTimeout(r, 5000));
        if (!isActive) break;
        setPulledIcons(null);
      }
    };

    cycle();

    return () => {
      isActive = false;
    };
  }, [iconsCount]);

  const renderIcon = (item: any, pulledState: 'left' | 'right' | false) => {
    const isPulled = pulledState !== false;
    
    // Determine text alignment to prevent screen overflow when pulled
    let textAlignmentClass = "left-1/2 -translate-x-1/2 items-center text-center"; // Default centered
    
    // if (pulledState === 'left') {
    //   textAlignmentClass = "left-0 items-start text-left";
    // } else if (pulledState === 'right') {
    //   textAlignmentClass = "right-0 items-end text-right";
    // }

    return (
      <motion.div
        className="relative flex flex-col items-center justify-center group cursor-pointer"
        whileHover={!isPulled ? { scale: 1.4, zIndex: 50 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedSkill(item);
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className={`p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] ${item.color}`}>
            <item.icon size={22} className={`transition-transform duration-300 ${!isPulled ? 'group-hover:scale-110' : ''}`} />
          </div>
          <div className={`absolute inset-0 blur-md transition-opacity duration-300 ${item.color} bg-current rounded-full ${isPulled ? 'opacity-60 animate-pulse' : 'opacity-30 group-hover:opacity-80'}`} />
        </div>
        
        <div className={`absolute top-full mt-4 flex flex-col transition-all duration-300 bg-slate-800/90 p-3 rounded-xl border border-white/10 backdrop-blur-md shadow-xl pointer-events-none ${isPulled ? 'opacity-100 w-64' : 'opacity-0 group-hover:opacity-100 w-52'} ${textAlignmentClass}`}>
          <span className={`font-medium text-white/90 ${isPulled ? 'text-base mb-1.5' : 'text-sm mb-1'} whitespace-nowrap`}>
            {item.name}
          </span>
          {item.description && (
            <span className={`text-slate-400 whitespace-normal leading-relaxed ${isPulled ? 'text-xs line-clamp-4' : 'text-[10px] line-clamp-3'}`}>
              {item.description}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-[1200px] h-[1200px] flex items-center justify-center pointer-events-none"
    >
      {mounted && (
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {ICON_LIST.map((item, index) => {
            const angle = (index / iconsCount) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isPulled = pulledIcons?.left === index || pulledIcons?.right === index;

            return (
              <div
                key={index}
                className="absolute pointer-events-auto transition-all duration-300"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: hoveredIndex === index ? 50 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 160, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {!isPulled ? (
                    <motion.div layoutId={`icon-${index}`}>
                      {renderIcon(item, false)}
                    </motion.div>
                  ) : (
                    <div className="w-[42px] h-[42px] rounded-full border border-dashed border-white/20 opacity-30" />
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      )}
      
      {/* Decorative dashed rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1080px] h-[1080px] rounded-full border border-dashed border-white/5" />
        <div className="w-[760px] h-[760px] rounded-full border border-dashed border-white/5" />
      </div>

      {/* Pulled Icons Overlay */}
      {pulledIcons && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <motion.div 
            layoutId={`icon-${pulledIcons.left}`} 
            className="absolute top-1/2 left-[20px] pointer-events-auto"
            style={{ y: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
             {renderIcon(ICON_LIST[pulledIcons.left], 'left')}
          </motion.div>
          <motion.div 
            layoutId={`icon-${pulledIcons.right}`} 
            className="absolute top-1/2 right-[20px] pointer-events-auto"
            style={{ y: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
             {renderIcon(ICON_LIST[pulledIcons.right], 'right')}
          </motion.div>
        </div>
      )}

      {/* Skill Execution Panel Overlay */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[200] pointer-events-auto flex items-center justify-center">
          <SkillExecutionPanel 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
          />
        </div>
      )}
    </motion.div>
  );
}
