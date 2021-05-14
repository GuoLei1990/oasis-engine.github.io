import React, { useState } from 'react';
import { graphql } from "gatsby";
import Menu from '../components/typedoc/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb, Popover } from 'antd';
import Package from '../components/typedoc/Package';
import Module from '../components/typedoc/Module';
import Media from 'react-media';
import { MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

export default function API (props: any) {
  const { node, type, packages, packageIndex } = props.pageContext;
  const pkg = packages[packageIndex];

  if (type === 'module' && packageIndex !== undefined) {
    pkg.child = node;
  }

  const menuData = {children: packages}

  const [menuVisible, toggleMenu] = useState(false);

  const menu = <Menu {...menuData }/>

  return (
    <>
      <WrapperLayout {...props}>
        <Media query="(max-width: 599px)">
          {(isMobile) => 
          <Layout hasSider={true}>
            <Content className="api" style={{ padding: '20px', backgroundColor: '#fff' }}>
              {isMobile &&
                  <Popover
                    className="examples-popover-menu"
                    placement="bottomRight"
                    content={menu}
                    trigger="click"
                    visible={menuVisible}
                    arrowPointAtCenter
                  >
                    <MenuUnfoldOutlined className="nav-phone-icon" onClick={() => {toggleMenu(!menuVisible)}} />
                  </Popover>
                } 
              <div className="tsc-content">
                <div className="tsc-nav">
                  <Breadcrumb>
                    <Breadcrumb.Item>API</Breadcrumb.Item>
                    {pkg && <Breadcrumb.Item>
                      <a href="./index">{pkg.name}</a>
                    </Breadcrumb.Item>}
                    {node && <Breadcrumb.Item>
                      {node.name && node.name.replace('/src', '')}
                    </Breadcrumb.Item>}
                  </Breadcrumb>
                </div>
                {type === 'package' ? <Package {...node} /> : <Module {...node} />}
              </div>
            </Content>
            {!isMobile && <Sider style={{ width: '300px!important' }}>{menu}</Sider>}
            </Layout>
          }
        </Media>
      </WrapperLayout>
    </>
  );
}

export const query = graphql`
  query {
    typedoc(typedocId: { eq: "default" }) {
      internal {
        content
      }
    }
  }
`;
