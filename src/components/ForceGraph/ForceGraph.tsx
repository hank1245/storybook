import { useEffect, useMemo, useRef } from 'react';

export type ForceGraphProps = {
  width?: number;
  height?: number;
  linkDistance?: number;
  chargeStrength?: number;
  collisionRadius?: number;
  labelTruncate?: number;
  showLabels?: boolean;
  containerClassName?: string;
  data?: ForceGraphData;
};

export type ForceGraphNode = {
  id: string;
  name: string;
  url: string;
  type: string;
  group: number;
};

export type ForceGraphLink = {
  source: string;
  target: string;
  value?: number;
};

export type ForceGraphData = {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
};

export const defaultForceGraphData: ForceGraphData = {
  nodes: [
    { id: 'notionpage', name: "Hank's Page", url: 'https://kimhank.oopy.io/', type: 'center', group: 0 },
    { id: 'portfolio', name: 'Portfolio', url: 'https://portfolio-seven-azure-73.vercel.app/', type: 'project', group: 1 },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/huiung-kim-3b1330244/', type: 'social', group: 2 },
    { id: 'github', name: 'GitHub', url: 'https://github.com/hank1245', type: 'social', group: 2 },
    { id: 'x', name: 'X (Twitter)', url: 'https://x.com/HankKimDev', type: 'social', group: 2 },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/huiung1/', type: 'social', group: 2 },
    { id: 'blog', name: 'Blog', url: 'https://hank1245.github.io/', type: 'project', group: 3 },
    { id: 'ai_creation', name: 'AI Creation', url: 'https://www.instagram.com/ai_daramgi/', type: 'project', group: 3 },
    { id: 'directorytracer', name: 'Directory Tracer', url: 'https://directorytracer.xyz/', type: 'project', group: 3 },
    { id: 'bedtimestoryteller', name: 'Bedtime Story Teller', url: 'https://bedtimestoryteller.rest/', type: 'project', group: 3 },
    { id: 'algorithmplayground', name: 'Algorithm Playground', url: 'https://algorithmplayground.vercel.app/', type: 'project', group: 3 },
    { id: 'vocasimple', name: 'Voca Simple', url: 'https://endearing-pie-91e6b8.netlify.app/', type: 'project', group: 3 }
  ],
  links: [
    { source: 'notionpage', target: 'portfolio', value: 1 },
    { source: 'notionpage', target: 'linkedin', value: 1 },
    { source: 'notionpage', target: 'github', value: 1 },
    { source: 'notionpage', target: 'x', value: 1 },
    { source: 'notionpage', target: 'instagram', value: 1 },
    { source: 'notionpage', target: 'blog', value: 1 },
    { source: 'notionpage', target: 'ai_creation', value: 1 },
    { source: 'portfolio', target: 'directorytracer', value: 1 },
    { source: 'portfolio', target: 'bedtimestoryteller', value: 1 },
    { source: 'portfolio', target: 'algorithmplayground', value: 1 },
    { source: 'portfolio', target: 'vocasimple', value: 1 }
  ]
};

export default function ForceGraph({
  width = 500,
  height = 480,
  linkDistance = 80,
  chargeStrength = -300,
  collisionRadius = 25,
  labelTruncate = 12,
  showLabels = true,
  containerClassName = 'w-full bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-xl shadow-lg border border-gray-200/50 overflow-hidden relative',
  data
}: ForceGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const graphData = useMemo<ForceGraphData>(() => data ?? defaultForceGraphData, [data]);

  useEffect(() => {
    let cleanup = () => {};
    let mounted = true;
    (async () => {
      const d3: any = await import('d3');
      if (!mounted || !svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const svgWidth = width;
      const svgHeight = height;

      svg
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('viewBox', [0, 0, svgWidth, svgHeight] as unknown as string)
        .attr('role', 'img')
        .attr('aria-labelledby', 'force-graph-title force-graph-desc');

      svg.append('title').attr('id', 'force-graph-title').text("Interactive network graph of Hank's links");
      svg
        .append('desc')
        .attr('id', 'force-graph-desc')
        .text('Use Tab to focus nodes and Enter or Space to open the selected link in a new tab.');

      const defs = svg.append('defs');

      const centerGradient = defs
        .append('radialGradient')
        .attr('id', 'centerGradient')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      centerGradient.append('stop').attr('offset', '0%').attr('stop-color', '#6366f1');
      centerGradient.append('stop').attr('offset', '100%').attr('stop-color', '#4338ca');

      const mainGradient = defs
        .append('radialGradient')
        .attr('id', 'mainGradient')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      mainGradient.append('stop').attr('offset', '0%').attr('stop-color', '#10b981');
      mainGradient.append('stop').attr('offset', '100%').attr('stop-color', '#059669');

      const socialGradient = defs
        .append('radialGradient')
        .attr('id', 'socialGradient')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      socialGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b');
      socialGradient.append('stop').attr('offset', '100%').attr('stop-color', '#d97706');

      const projectGradient = defs
        .append('radialGradient')
        .attr('id', 'projectGradient')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');
      projectGradient.append('stop').attr('offset', '0%').attr('stop-color', '#8b5cf6');
      projectGradient.append('stop').attr('offset', '100%').attr('stop-color', '#7c3aed');

      const getGradientId = (group: number) => {
        const gradients = ['centerGradient', 'mainGradient', 'socialGradient', 'projectGradient'] as const;
        const idx = ((group ?? 0) % gradients.length + gradients.length) % gradients.length;
        return `url(#${gradients[idx]})`;
      };
      const forceGraphData = graphData;

      const simulation = d3
        .forceSimulation(forceGraphData.nodes as unknown as any[])
        .force(
          'link',
          d3
            .forceLink(forceGraphData.links as unknown as any[])
            .id((d: any) => d.id)
            .distance(linkDistance)
        )
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
        .force('collision', d3.forceCollide().radius(collisionRadius));

      const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(55, 65, 81, 0.9))')
        .style('color', 'white')
        .style('padding', '12px 16px')
        .style('border-radius', '8px')
        .style('font-size', '14px')
        .style('font-weight', '500')
        .style('pointer-events', 'none')
        .style('z-index', '1000')
        .style('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)')
        .style('backdrop-filter', 'blur(4px)')
        .attr('role', 'tooltip')
        .attr('aria-hidden', 'true');

      const linkGradient = defs
        .append('linearGradient')
        .attr('id', 'linkGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      linkGradient.append('stop').attr('offset', '0%').attr('stop-color', '#e5e7eb').attr('stop-opacity', 0.3);
      linkGradient.append('stop').attr('offset', '50%').attr('stop-color', '#9ca3af').attr('stop-opacity', 0.8);
      linkGradient.append('stop').attr('offset', '100%').attr('stop-color', '#e5e7eb').attr('stop-opacity', 0.3);

      const link = svg
        .append('g')
        .selectAll('line')
        .data(forceGraphData.links as unknown as any[])
        .join('line')
        .attr('stroke', 'url(#linkGradient)')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.7);

      const node = svg
        .append('g')
        .selectAll('circle')
        .data(forceGraphData.nodes as unknown as any[])
        .join('circle')
        .attr('r', (d: any) => (d.type === 'center' ? 20 : 14))
        .attr('fill', (d: any) => getGradientId(d.group))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 3)
        .style('cursor', 'pointer')
        .style('filter', 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))')
        .on('mouseover', function (this: any, _event: any, d: any) {
          tooltip
            .style('visibility', 'visible')
            .html(
              `<div style="font-weight: 600; margin-bottom: 4px;">${d.name}</div>
                 <div style="font-size: 12px; opacity: 0.8;">${String(d.type).toUpperCase()}</div>`
            );
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.type === 'center' ? 25 : 18)
            .style('filter', 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))');
        })
        .on('mousemove', function (this: any, event: any) {
          tooltip.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px');
        })
        .on('mouseout', function (this: any, _event: any, d: any) {
          tooltip.style('visibility', 'hidden');
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', d.type === 'center' ? 20 : 14)
            .style('filter', 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))');
        })
        .on('click', function (this: any, _event: any, d: any) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr('r', d.type === 'center' ? 15 : 10)
            .transition()
            .duration(100)
            .attr('r', d.type === 'center' ? 20 : 14);
          window.open(d.url, '_blank');
        })
        .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

      const label = showLabels
        ? svg
            .append('g')
            .selectAll('text')
            .data(forceGraphData.nodes as unknown as any[])
            .join('text')
            .text((d: any) =>
              d.name.length > labelTruncate ? d.name.substring(0, labelTruncate - 2) + '...' : d.name
            )
            .attr('font-family', "'Inter', 'system-ui', sans-serif")
            .attr('font-size', (d: any) => (d.type === 'center' ? '13px' : '11px'))
            .attr('font-weight', (d: any) => (d.type === 'center' ? '600' : '500'))
            .attr('text-anchor', 'middle')
            .attr('dy', (d: any) => (d.type === 'center' ? 35 : 28))
            .attr('fill', '#374151')
            .style('pointer-events', 'none')
            .style('text-shadow', '0 1px 2px rgba(255, 255, 255, 0.8)')
        : null;

      node
        .attr('role', 'link')
        .attr('tabindex', 0)
        .attr('aria-label', (d: any) => `${d.name} (${d.type}) — opens in a new tab`)
        .on('keydown.a11y', function (event: any, d: any) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.open(d.url, '_blank');
          }
        })
        .on('focus', function (this: any) {
          d3.select(this).attr('stroke', '#111827').attr('stroke-width', 4);
        })
        .on('blur', function (this: any) {
          d3.select(this).attr('stroke', '#ffffff').attr('stroke-width', 3);
        })
        .on('mouseover.a11y', function () {
          tooltip.attr('aria-hidden', 'false');
        })
        .on('mouseout.a11y', function () {
          tooltip.attr('aria-hidden', 'true');
        });

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => (d.source as any).x)
          .attr('y1', (d: any) => (d.source as any).y)
          .attr('x2', (d: any) => (d.target as any).x)
          .attr('y2', (d: any) => (d.target as any).y);
        node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
        if (label) label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
      });

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      cleanup = () => {
        tooltip.remove();
        simulation.stop();
      };
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [chargeStrength, collisionRadius, containerClassName, graphData, height, labelTruncate, linkDistance, showLabels, width]);

  return (
    <section
      className={containerClassName}
      aria-labelledby="force-graph-heading"
      role="region"
    >
      <h2 id="force-graph-heading" className="sr-only">
        Interactive Network Graph
      </h2>
      <p id="force-graph-instructions" className="sr-only">
        Tab to focus nodes. Press Enter or Space to open the selected link in a new tab.
      </p>
      <svg ref={svgRef} className="w-full" aria-describedby="force-graph-instructions"></svg>
    </section>
  );
}
