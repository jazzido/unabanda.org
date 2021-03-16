// pages/server-sitemap.xml/index.tsx
import moment from "moment-timezone";
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import config from "../../lib/config";
import { PERIODS } from "../../components/PeriodSelector";

const encodeHTML = function (s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const periodUrls = PERIODS.filter(p => p.path !== "").map(period => ({
    loc: `${config.siteUrl}/eventos/${period.path}`
}));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const today = moment().tz(config.timeZone).startOf("day").format("YYYY-MM-DD");
  var eventUrls = [];
  var url = `${config.apiEndpoint}/unabanda/event.json?_sort=fecha&fecha__gte=${today}&_labels=on`;
  while (true) {
    const futureEventsReq = await fetch(url);
    const futureEventsResp = await futureEventsReq.json();
    eventUrls = [
        ...eventUrls,
        ...futureEventsResp.rows.map(row => ({
            loc: `${config.siteUrl}/evento/${row.at_record_id}-${encodeHTML(row.slug)}`,
            lastmod: moment(row.at_last_modified).toISOString()
        }))
    ];
    if (futureEventsResp.next_url) {
        url = futureEventsResp.next_url;
    }
    else {
        break;
    }
  }

  return getServerSideSitemap(ctx, [...periodUrls, ...eventUrls]);
}

// Default export to prevent next.js errors
const def = () => {};
export default def;
