import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import merge from "lodash/merge";

import config from "../lib/config";

const mergeSeo = (seoProps) => {
  const m = merge({ ...config.defaultSeo }, seoProps);
  if (seoProps.title) {
    m.openGraph.title = m.titleTemplate
      ? m.titleTemplate.replace(/%s/g, () => seoProps.title)
      : seoProps.title;
  }
  return m;
};

const Seo = props => {
  const router = useRouter();
  const merged = merge(props, {
    openGraph: {
      url: `${config.siteUrl}${router.asPath}`
    }
  });
  return <NextSeo {...mergeSeo(merged)} />;
};

export default Seo;
