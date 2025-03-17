import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const dataAll = await req.json();
    const url = dataAll.serviceUrl;
    const { Authorization } = dataAll;

    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    delete dataAll.serviceUrl;
    delete dataAll.Authorization;
    delete dataAll.headers;
    const response = await axios.post(url, dataAll, {
    //   headers: {
    //     Authorization,
    //     'Content-Type': 'application/json',
    //   },
    });

    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = decodeURIComponent(req.nextUrl.searchParams.toString().replace('url=', ''));
    if (!url) {
      throw new Error('URL is not defined in the request body');
    }

    const response = await axios.get(url, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   username: req.headers.get('username') || 'Unknown User',
      //   ipAddress:
      //     req.headers.get('x-forwarded-for')?.split(',')[0].replace('::ffff:', '') || req.ip,
      //   permission: JSON.stringify(req.headers.get('permission') || {}),
      // },
    });
    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url');
    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    const response = await axios.delete(url);
    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const dataAll = await req.json();
    const url = dataAll.serviceUrl;

    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    delete dataAll.serviceUrl;
    // delete dataAll.headers;

    const response = await axios.put(url, dataAll);

    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
